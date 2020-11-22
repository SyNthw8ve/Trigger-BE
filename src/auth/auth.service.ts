import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { UserValidation } from './dtos/user-validation.dto';
import { AuthResult, Status } from './dtos/auth-result.dto';
import { Token } from './dtos/token.dto';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService,
        private readonly jwtService: JwtService) { }

    async validateUser(toValidate: UserValidation): Promise<AuthResult> {

        let authResult = { result: null, status: Status.INVALID_EMAIL, success: false, accessToken: null };
        const user: User = await this.userService.findWithEmail(toValidate.email);

        if (user) {

            authResult = { result: null, status: Status.PASSWORD_NOT_MATCH, success: false, accessToken: null }

            const isEqual = await compare(toValidate.password, user.password)

            if (isEqual) {

                authResult = { result: { userId: user._id.toString() }, status: Status.OK, success: true, accessToken: null }
            }
        }

        return authResult;
    }

    async login(user: UserValidation): Promise<AuthResult> {

        let authResult = await this.validateUser(user);

        if (authResult.success) {

            const payload = { userId: authResult.result.userId };
            authResult.accessToken = this.jwtService.sign(payload);
        }

        return authResult;
    }
}
