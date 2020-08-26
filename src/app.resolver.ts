import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthResult } from './auth/dtos/auth-result.dto';
import { UserValidation } from './auth/dtos/user-validation.dto';

@Resolver()
export class AppResolver {

  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) { }

  @Query(returns => AuthResult)
  async loginEmail(@Args('user') user: UserValidation): Promise<AuthResult> {

    return await this.authService.validateUser(user);
  }
}
