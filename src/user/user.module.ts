import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserResolver } from './user.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        CommonModule],
    providers: [UserService, UserResolver],
    exports: [UserService],
})
export class UserModule { }
