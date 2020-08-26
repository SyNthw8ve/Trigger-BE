import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserValidation } from '../dtos/user-validation.dto';
import { User } from 'src/user/schemas/user.schema';
import { AuthResult } from '../dtos/auth-result.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {

        super();
    }

    async validate(toValidate: UserValidation): Promise<AuthResult> {
       
        const result: AuthResult = await this.authService.validateUser(toValidate);

        if (!result.success) throw new UnauthorizedException();

        return result;
    }
}