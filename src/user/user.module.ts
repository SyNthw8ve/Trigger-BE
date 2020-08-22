import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        CommonModule],
    controllers: [UserController],
    providers: [
        UserService,],
    exports: [UserService,],
})
export class UserModule { }
