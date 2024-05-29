export const formatDateToVND = (date) => {
    return (
        new Date(date).toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }) +
        ' ' +
        new Date(date).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
        })
    );
};
