export const formatDateTimeToHM = (timestamp) => {
    const numberTimestamp = Number(timestamp);
    if (isNaN(numberTimestamp)) {
        throw new Error(`Invalid timestamp: ${timestamp}`);
    }
    let timeString = new Date(numberTimestamp).toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return timeString.split(':').join('h');
};
