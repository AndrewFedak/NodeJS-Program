import { SUPPORTED_COUNTRIES } from "../src/config"

import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from "../src/services/public-holidays.service"

describe('Public holidays service', () => {
    describe('getListOfPublicHolidays', () => {
        it('should get holidays in "short" format', () => {
            const year = 2023
            const country = SUPPORTED_COUNTRIES[0]
            
            return expect(getListOfPublicHolidays(year, country)).resolves.toBeTruthy()
        })
    })

    describe('checkIfTodayIsPublicHoliday', () => {
        test('public holiday is not today', () => {
            const country = 'GB'
            
            return expect(checkIfTodayIsPublicHoliday(country)).resolves.toBeFalsy()
        })
        xtest('public holiday is today', () => {
            const country = 'FR'
            
            return expect(checkIfTodayIsPublicHoliday(country)).resolves.toBeTruthy()
        })
    })

    describe('getNextPublicHolidays', () => {
        it('should get next public holidays in "short" format', () => {
            const country = SUPPORTED_COUNTRIES[0]
            
            return expect(getNextPublicHolidays(country)).resolves.toBeTruthy()
        })
    })
})