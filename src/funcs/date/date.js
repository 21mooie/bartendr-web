const createTimeFrameString = (value, timeframe) => {
    return `${value > 1 ? value : 'a'} ${timeframe}${value > 1 ? 's' : ''} ago`
};
//TODO: make a global currdate object to compare all calls with this; would save memory
const dateToReadableTimeFrame = (date) => {
    const currDate = new Date();
    const diff = currDate - date;
    const secondInMs = 1000;
    const minuteInMs = 60000;
    const hourInMs   = 3600000;
    const dayInMs    = 86400000;
    const monthInMs  = 2629746000;
    const yearInMs   = 31556952000; 
    if (diff < secondInMs) {
        return 'a second ago';
    } else if (secondInMs <= diff && diff < minuteInMs ) {
        // calculate number of seconds
        return createTimeFrameString(Math.floor(diff/secondInMs), 'second');
    } else if (minuteInMs <= diff && diff < hourInMs) {
        // calculate number of minutes
        return createTimeFrameString(Math.floor(diff/minuteInMs), 'minute');
    } else if (hourInMs <= diff && diff < dayInMs) {
        // calculate number of hours
        return createTimeFrameString(Math.floor(diff/hourInMs), 'hour');
    } else if (dayInMs <= diff && diff < monthInMs) {
         // calculate number of days
         return createTimeFrameString(Math.floor(diff/dayInMs), 'day');
    } else if (monthInMs <= diff && diff < yearInMs) {
         // calculate number of months
         return createTimeFrameString(Math.floor(diff/monthInMs), 'month');
    } else {
        // calculate number of years
        return createTimeFrameString(Math.floor(diff/yearInMs), 'year');
    }
};

export { dateToReadableTimeFrame };