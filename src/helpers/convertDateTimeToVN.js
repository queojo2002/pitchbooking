import moment from 'moment-timezone';

export const convertDateTimeToVN = (date) => {
    const event = moment(date).tz('Asia/Ho_Chi_Minh');
    return event.format();
}