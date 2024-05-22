export default passwordValidator = (password) => {
    if (!password) {
        return "Mật khẩu không được để trống.";
    }

    if (password.length < 8) {
        return "Mật khẩu phải có ít nhất 8 ký tự.";
    }

    if (!/[A-Z]/.test(password)) {
        return "Mật khẩu phải chứa ít nhất một chữ cái viết hoa.";
    }

    if (!/[a-z]/.test(password)) {
        return "Mật khẩu phải chứa ít nhất một chữ cái viết thường.";
    }

    if (!/[0-9]/.test(password)) {
        return "Mật khẩu phải chứa ít nhất một chữ số.";
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return "Mật khẩu phải chứa ít nhất một ký tự đặc biệt.";
    }

    return '';
}