export default emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (!email) {
      return "Email của bạn không được để trống.";
    }
    if (!re.test(email)) {
      return 'Lỗi! Email của bạn nhập không đúng định dạng.';
    }
    return '';
}
  