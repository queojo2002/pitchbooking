import moment from 'moment-timezone';

export const getDateTimeVN = () => {
    const event = moment().tz('Asia/Ho_Chi_Minh');
    return event.format();
}


