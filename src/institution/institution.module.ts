import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { InstitutionResolver } from './institution.resolver';
import { InstitutionService } from './institution.service';
import { Institution, InstitutionSchema } from './schemas/institution.schema';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Institution.name, schema: InstitutionSchema }]),
        CommonModule,
    forwardRef(() => UserModule),
    forwardRef(() => ProjectModule)
    ],
    providers: [
        InstitutionService,
        InstitutionResolver
    ],
    exports: [InstitutionService,],
})
export class InstitutionModule { }
