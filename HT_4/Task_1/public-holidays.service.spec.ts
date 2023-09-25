import axios from "axios"

import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from "../src/config"

import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from "../src/services/public-holidays.service"

import { PublicHoliday } from "../src/types"

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Public holidays service', () => {
    const validYear = new Date().getFullYear()
    const validCountry = SUPPORTED_COUNTRIES[0]

    const invalidCountry = 'invalid country';
    const invalidYear = 1000;

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('getListOfPublicHolidays', () => {
        it('should expect an error in case of invalid params', () => {
            return expect(getListOfPublicHolidays(invalidYear, validCountry)).rejects.toThrow()
        })
        it('should return empty list in case request fails', () => {
            const emptyList: unknown[] = [];
            mockedAxios.get.mockRejectedValueOnce(null);

            return expect(getListOfPublicHolidays(validYear, validCountry)).resolves.toEqual(emptyList)
        })
        test('should call API with proper arguments', async () => {
            await getListOfPublicHolidays(validYear, validCountry);

            expect(mockedAxios.get).toBeCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${validYear}/${validCountry}`)
        })
        it('should return list of public holidays in "short" format', async () => {
            const res: PublicHoliday[] = [{
                date: 'some date',
                localName: 'string',
                name: 'string',
                countryCode: 'string',
            } as PublicHoliday];
            mockedAxios.get.mockResolvedValueOnce({ data: res });

            const publicHolidayShort = await getListOfPublicHolidays(validYear, validCountry);

            expect(publicHolidayShort).toEqual<typeof publicHolidayShort>([{
                name: res[0].name,
                date: res[0].date,
                localName: res[0].localName
            }])
        })
    })

    describe('checkIfTodayIsPublicHoliday', () => {
        it('should expect an error in case of invalid params', () => {
            return expect(checkIfTodayIsPublicHoliday(invalidCountry)).rejects.toThrow()
        })
        it('should return false in case request fails', () => {
            mockedAxios.get.mockRejectedValueOnce(null);

            return expect(checkIfTodayIsPublicHoliday(validCountry)).resolves.toBeFalsy()
        })
        test('today is not public holiday', () => {
            mockedAxios.get.mockResolvedValueOnce({ status: 204 });

            return expect(checkIfTodayIsPublicHoliday(validCountry)).resolves.toBeFalsy()
        })
        test('today is public holiday', () => {
            mockedAxios.get.mockResolvedValueOnce({ status: 200 });

            return expect(checkIfTodayIsPublicHoliday(validCountry)).resolves.toBeTruthy()
        })
    })

    describe('getNextPublicHolidays', () => {
        it('should expect an error in case of invalid params', () => {
            return expect(getNextPublicHolidays(invalidCountry)).rejects.toThrow()
        })
        it('should return empty list in case request fails', () => {
            const emptyList: unknown[] = [];
            mockedAxios.get.mockRejectedValueOnce(null);

            return expect(getNextPublicHolidays(validCountry)).resolves.toEqual(emptyList)
        })
        test('should call API with proper arguments', async () => {
            await getNextPublicHolidays(validCountry);

            expect(mockedAxios.get).toBeCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${validCountry}`)
        })
        it('should return list of next public holidays in "short" format', async () => {
            const res: PublicHoliday[] = [{
                date: 'some date',
                localName: 'string',
                name: 'string',
                countryCode: 'string',
            } as PublicHoliday];
            mockedAxios.get.mockResolvedValueOnce({ data: res });

            const nextPublicHolidayShort = await getNextPublicHolidays(validCountry);

            expect(nextPublicHolidayShort).toEqual<typeof nextPublicHolidayShort>([{
                name: res[0].name,
                date: res[0].date,
                localName: res[0].localName
            }])
        })
    })
})