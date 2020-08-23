import { Injectable } from '@nestjs/common';
import { Locale } from './schemas/locale.schema';

@Injectable()
export class LocationService {

    async localeFromAdress(adress: Locale['address']): Promise<Locale> {
        let location = new Locale();
        location.address = adress;
        location.position = await this.get_coordinates_for_adress(adress);
        return location;
    }

    // TODO: Make this actually do something
    async get_coordinates_for_adress(adress: Locale['address']): Promise<Locale['position']> {
        return { longitude: 23, latitude: 24 };
    }

}
