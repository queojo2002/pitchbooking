// Chuyển đổi số điện thoại sang định dạng quốc tế
export const convertToInternationalFormat = (phoneNumber) => {
    if (!phoneNumber) return '';
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        return '+84' + cleaned.slice(1);
    }
    return '+84' + cleaned;
};
