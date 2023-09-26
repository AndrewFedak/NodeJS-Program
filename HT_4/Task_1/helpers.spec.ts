import { SUPPORTED_COUNTRIES } from '../src/config'

import { shortenPublicHoliday, validateInput } from '../src/helpers'

import { PublicHoliday, PublicHolidayShort } from '../src/types'

describe('Helpers', () => {
    describe('validateInput', () => {
        it('should handle an error in case country is not supported', () => {
            const input = {
                country: 'invalid country'
            }
            expect(() => validateInput(input)).toThrowError(`Country provided is not supported, received: ${input.country}`)
        })
        it('should handle an error in case year differ from current', () => {
            const input = {
                year: new Date().getFullYear() + 1
            }
            expect(() => validateInput(input)).toThrowError(`Year provided not the current, received: ${input.year}`)
        })
        it('should acknowledge valid input', () => {
            expect(validateInput({
                country: SUPPORTED_COUNTRIES[0],
            })).toBeTruthy()

            expect(validateInput({
                year: new Date().getFullYear()
            })).toBeTruthy()
        })
    })

    describe('shortenPublicHoliday', () => {
        test('shortened public holiday', () => {
            const holiday = {
                date: '16.03.2000',
                localName: 'Local',
                name: 'New Year',
                countryCode: '79998'
            } as PublicHoliday

            const shortenedHoliday: PublicHolidayShort = {
                date: holiday.date,
                localName: holiday.localName,
                name: holiday.name
            }

            expect(shortenPublicHoliday(holiday)).toEqual(shortenedHoliday)
        })
    })
})