import request from 'supertest';

import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from '../src/config';
import { LongWeekend, PublicHoliday } from '../src/types';

describe('Country', () => {
    describe('/AvailableCountries', () => {
        test('supported countries defined in app to exist in available countries', async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get('/AvailableCountries');

            const availableCountries = (body as Pick<PublicHoliday, 'name' | 'countryCode'>[])

            const doesSupportedCountriesExistInAvailable = SUPPORTED_COUNTRIES.every(supportedCountry => {
                return availableCountries.find((country) => {
                    return supportedCountry === country.countryCode
                })
            })

            expect(status).toEqual(200);
            expect(doesSupportedCountriesExistInAvailable).toBeTruthy()
        });
    });
});

describe('LongWeekend', () => {
    describe('/LongWeekend/{year}/{countryCode}', () => {
        test('supported countries defined in app should exist in available countries', async () => {
            const currentYear = new Date().getFullYear()
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/LongWeekend/${currentYear}/${SUPPORTED_COUNTRIES[0]}`);

            const listOfLongWeekends: LongWeekend[] = body

            const firstLongWeekend = listOfLongWeekends[0]

            expect(status).toEqual(200);
            expect(new Date(firstLongWeekend.startDate).getFullYear()).toBe(currentYear)
            expect(new Date(firstLongWeekend.endDate).getFullYear()).toBe(currentYear)
        });
    });
})