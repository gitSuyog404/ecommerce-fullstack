function isEmail(email) {
  const emailPattern =
    /^([a-z][a-z0-9_\.]+[a-z0-9])@([a-z0-9]{2,20})\.([a-z]{2,5})(\.[a-z]{2,5})?$/;
  return emailPattern.test(email);
}

function isStrongPassword(password) {
  let pwrdPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&\*])[a-zA-Z0-9!@#$%^&\*]{8,}$/;
  return pwrdPattern.test(password);
}
export { isEmail, isStrongPassword };
