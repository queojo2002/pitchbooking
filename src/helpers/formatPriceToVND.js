export const formatPriceToVND = (price) => {
    const numberPrice = Number(price);
    return numberPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
