import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ConfirmationData, RegistrationStep, User } from './schemas/user.schema';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InsertionResult, Description } from './dtos/insertion-result.dto';
import { Project } from 'src/project/schemas/project.schema';

import { genSalt, hash } from 'bcrypt';
import { RegisterEmailUserDto } from './dtos/register-email-user.dto';
import { ConfirmationType, ConfirmationUserRequestDto } from './dtos/confirmation-user-request.dto';
import { ConfirmationUserDto } from './dtos/confirmation-user.dto';
import { ConfirmationDescription, ConfirmationResult } from './dtos/confirmation-result.dto';
import { CommunicateUserFinishedProfileDto } from './dtos/user-finished-profile';
import { SoftSkillQuestion } from 'src/soft-quiz/schemas/soft-quiz.schema';
import { EmailService } from 'src/email/email.service';


@Injectable()
export class UserService {

    saltRounds = 10;

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly emailService: EmailService
    ) { }

    async hashPassword(plain: string): Promise<string> {
        const salt = await genSalt(this.saltRounds);
        return await hash(plain, salt);
    }

    async new(registerUserDto: RegisterEmailUserDto): Promise<InsertionResult> {

        try {
            const { password, ...userData } = registerUserDto;

            const encryptedPassword = await this.hashPassword(password);

            const createdUser = new this.userModel(
                {
                    email: userData.email,
                    password: encryptedPassword,
                    registrationStep: RegistrationStep.None,
                }
            );

            await createdUser.save();

            return { success: true, description: Description.OK, _id: createdUser._id };
        }

        catch (err) {

            if (err.code == 11000) {

                return { success: false, description: Description.EMAIL_IN_USE, _id: null };
            }

            console.error(err);
        }

    }

    async generatePhoneConfirmationCode(phoneCodeLength: number): Promise<string> {
        let digits = []
        for (let i = 0; i < phoneCodeLength; i++) {
            let digit = Math.floor(Math.random() * 11);
            digits.push(digit.toString());
        }

        return digits.join("");
    }

    async generateEmailConfirmationCode(email: string): Promise<string> {
        const salt = await genSalt(this.saltRounds);
        return hash(email, salt);
    }

    async attendToConfirmationRequest(confirmationRequest: ConfirmationUserRequestDto): Promise<Boolean> {
        const id = confirmationRequest.userId;

        let user = await this.findWithId(id);

        let correctCode: string;

        switch (confirmationRequest.confirmationType) {
            case ConfirmationType.Email:
                correctCode = await this.generateEmailConfirmationCode(user.email);
                await this.emailService.scheduleConfirmationEmail(correctCode);
                break;

            case ConfirmationType.Phone:
                correctCode = await this.generatePhoneConfirmationCode(6);
                break;
        }

        user.confirmationData = {
            correctCode,
            requestType: confirmationRequest.confirmationType,
            confirmed: false
        };

        if (confirmationRequest.phoneNumber) {
            user.confirmationData.phoneNumber = confirmationRequest.phoneNumber;
        }

        user.registrationStep = RegistrationStep.RequestedConfirmation;

        await user.save();

        // FIXME: think about ways it could fail
        return true;
    }

    async confirmEmail(confirmationData: ConfirmationData, confirmation: ConfirmationUserDto): Promise<boolean> {
        return confirmationData.correctCode == confirmation.confirmationData
    }

    async confirmPhone(confirmationData: ConfirmationData, confirmation: ConfirmationUserDto): Promise<boolean> {
        return confirmationData.correctCode == confirmation.confirmationData;
    }

    async attendToConfirmation(confirmation: ConfirmationUserDto): Promise<ConfirmationResult> {
        const id = confirmation.userId;

        let user = await this.findWithId(id);

        if (user.confirmationData.confirmed) {
            return { description: ConfirmationDescription.AlreadyConfirmed, present: true };
        }

        // TODO: implement well
        if (user.confirmationData) {
            switch (user.confirmationData.requestType) {
                case ConfirmationType.Email:
                    user.confirmationData.confirmed = await this.confirmEmail(user.confirmationData, confirmation);
                    break;
                case ConfirmationType.Phone:
                    user.confirmationData.confirmed = await this.confirmPhone(user.confirmationData, confirmation);
                    break;
            }
        }

        if (user.confirmationData.confirmed) {
            user.registrationStep = RegistrationStep.DidConfirmation;
            await user.save();
            return { description: ConfirmationDescription.Ok, present: true };
        }

        return { description: ConfirmationDescription.Wrong, present: false };
    }

    async update(updateUserDto: UpdateUserDto): Promise<User> {
        let { id, ...updateObj } = updateUserDto;

        if (updateObj.password) {
            updateObj.password = await this.hashPassword(updateObj.password);
        }

        return await this.userModel.findByIdAndUpdate({ _id: id }, updateObj, { useFindAndModify: false });
    }

    async attendToUserFinishedProfile(dto: CommunicateUserFinishedProfileDto): Promise<boolean> {
        let updateObj = {
            registrationStep: RegistrationStep.DidProfile
        };

        return await this.userModel.findByIdAndUpdate({ _id: dto.id }, updateObj, { useFindAndModify: false }) != null;
    }

    async addProject(managerId: User['_id'], projectId: Project['_id']) {
        const user = await this.userModel.findById(managerId);
        user.projects.push(projectId);
        user.save();
    }

    async getUsers(): Promise<User[]> {

        return await this.userModel.find();
    }

    async findWithId(id: User['_id']): Promise<User> {

        return await this.userModel.findById(id);
    }

    async setQuizData(id: User['_id'], quiz: SoftSkillQuestion[]): Promise<void> {

        const user = await this.userModel.findById(id);

        user.softSkillQuizQuestions = quiz.map(sq => sq._id);
        user.softSkillQuizAnswers = new Array(quiz.length).fill(null);

        await user.save();
    }

    async findWithEmail(email: string): Promise<User> {

        try {

            return await this.userModel.findOne({ 'email': email }).exec();

        } catch (err) {

            return null;
        }

    }

    async findManyWithId(ids: User['_id'][]): Promise<User[]> {

        return await this.userModel.find({ _id: { $in: ids } });
    }

}
