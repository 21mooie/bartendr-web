import { dateToReadableTimeFrame } from "./date";

describe('date', () => {
    describe('should convert date to readable format', () => {
        it('by showing \'a second ago\'.', () => {
            expect(dateToReadableTimeFrame(new Date()-900)).toEqual('a second ago');
        });

        it('by showing \'a second ago\'.', () => {
            expect(dateToReadableTimeFrame(new Date()-1000)).toEqual('a second ago');
        });

        it('by showing \'2 seconds ago\'.', () => {
            expect(dateToReadableTimeFrame(new Date() - 2000)).toEqual('2 seconds ago');
        });

        it('by showing \'a minute ago\'.', () => {
            expect(dateToReadableTimeFrame(new Date() - 60000)).toEqual('a minute ago');
        });

        it('by showing \'2 minutes ago\'.', () => {
            expect(dateToReadableTimeFrame(new Date() - 120000)).toEqual('2 minutes ago');
        });

        it('by showing \'a hour ago\'.', () => {
            expect(dateToReadableTimeFrame(new Date() - 3600000)).toEqual('a hour ago');
        });

        it('by showing \'2 hours ago\'.', () => {
            expect(dateToReadableTimeFrame(new Date() - 7200000)).toEqual('2 hours ago');
        });

        it('by showing \'a day ago\'.', () => {
            expect(dateToReadableTimeFrame(new Date() - 86400000)).toEqual('a day ago');
        });

        it('by showing \'2 days ago\'.', () => {
            expect(dateToReadableTimeFrame(new Date() - 172800000)).toEqual('2 days ago');
        });

        it('by showing \'a month ago\'.', () => {
            expect(dateToReadableTimeFrame(new Date() - 2629746000)).toEqual('a month ago');
        });

        it('by showing \'2 months ago\'.', () => {
            expect(dateToReadableTimeFrame(new Date() - 5259492000)).toEqual('2 months ago');
        });

        it('by showing \'a year ago\'.', () => {
            expect(dateToReadableTimeFrame(new Date() - 31556952000)).toEqual('a year ago');
        });

        it('by showing \'2 years ago\'.', () => {
            expect(dateToReadableTimeFrame(new Date() - 63113904000)).toEqual('2 years ago');
        });
    });
});