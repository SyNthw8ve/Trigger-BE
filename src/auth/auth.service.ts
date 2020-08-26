import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { UserValidation } from './dtos/user-validation.dto';
import { AuthResult, Status } from './dtos/auth-result.dto';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}

    async validateUser(toValidate: UserValidation) : Promise<AuthResult> {

        let authResult = { result: null, status: Status.INVALID_EMAIL, success: false };
        const user: User = await this.userService.findWithEmail(toValidate.email);
        
        if (user) {

            authResult = { result: null, status: Status.PASSWORD_NOT_MATCH, success: false }

            if (toValidate.password == user.password) {

                const { password, ...result } = user.toObject();
               
                authResult = { result: result, status: Status.OK, success: true }  
            }
        }
        
        return authResult;
    }
}
