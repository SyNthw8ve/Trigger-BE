import { UserService } from './user.service';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserHardskillResolver, UserLanguageResolver, UserResolver, UserSoftskillResolver } from './user.resolver';
import { CommonModule } from 'src/common/common.module';
import { ProjectModule } from 'src/project/project.module';
import { InstitutionModule } from 'src/institution/institution.module';
import { HardskillModule } from 'src/hardskill/hardskill.module';
import { LanguageModule } from 'src/language/language.module';
import { SoftskillModule } from 'src/softskill/softskill.module';
import { MatchModule } from 'src/match/match.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        CommonModule, 
        forwardRef(() =>InstitutionModule),
        HardskillModule,
        SoftskillModule,
        LanguageModule,
        forwardRef(() => ProjectModule),
        MatchModule
    ],
    providers: [UserService, UserResolver, UserSoftskillResolver, UserHardskillResolver, UserLanguageResolver],
    exports: [UserService],
})
export class UserModule { }
