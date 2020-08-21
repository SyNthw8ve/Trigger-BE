import { Module } from '@nestjs/common';
import { LocationService } from './location.service';

@Module({
    imports: [],
    controllers: [],
    providers: [LocationService],
    exports: [LocationService]
})
export class CommonModule { }
