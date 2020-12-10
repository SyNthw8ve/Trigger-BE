import { UserService } from './user.service';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserExperienceResolver, UserHardskillResolver, UserLanguageResolver, UserLearningResolver, UserResolver, UserSoftskillResolver } from './user.resolver';
import { CommonModule } from 'src/common/common.module';
import { ProjectModule } from 'src/project/project.module';
import { InstitutionModule } from 'src/institution/institution.module';
import { HardskillModule } from 'src/hardskill/hardskill.module';
import { LanguageModule } from 'src/language/language.module';
import { SoftskillModule } from 'src/softskill/softskill.module';
import { MatchModule } from 'src/match/match.module';
import { CourseModule } from 'src/course/course.module';
import { EmailModule } from 'src/email/email.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        CommonModule,
        forwardRef(() => InstitutionModule),
        HardskillModule,
        SoftskillModule,
        LanguageModule,
        forwardRef(() => ProjectModule),
        MatchModule,
        CourseModule,
        EmailModule
    ],
    providers: [UserService, UserResolver, UserSoftskillResolver, UserHardskillResolver, UserLanguageResolver, UserLearningResolver, UserExperienceResolver],
    exports: [UserService],
})
export class UserModule { }
