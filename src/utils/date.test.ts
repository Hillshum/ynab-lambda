
import { getStartOfMonth } from "./date";

describe("getStartOfMonth", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should return the first day when the current day is the first', () => {
        jest.setSystemTime(new Date('2021-03-01T00:00:00.000Z'));
        expect(getStartOfMonth()).toEqual(new Date('2021-03-01T00:00:00.000Z'));
        
     })

     it('should return the first day when the current day is the middle', () => {
        jest.setSystemTime(new Date('2021-03-15'));
        expect(getStartOfMonth()).toEqual(new Date('2021-03-01'));
        
     })

     it('should return the first day when the current day is the last', () => {
        jest.setSystemTime(new Date('2021-04-31'));
        expect(getStartOfMonth()).toEqual(new Date('2021-04-01'));
        
     });
})