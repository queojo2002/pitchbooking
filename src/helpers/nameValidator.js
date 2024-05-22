export default nameValidator = (fullName) => {
  if (!fullName) {
    return "Họ và tên không được để trống.";
  }

  if (fullName.length < 2 || fullName.length > 50) {
    return "Họ và tên phải có độ dài từ 2 đến 50 ký tự.";
  }


  return '';
}
