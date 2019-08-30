import * as Yup from 'yup';

function makesPasswordRequired(oldPassword, field) {
  return oldPassword ? field.required() : field;
}

function makesConfirmPasswordRequired(password, field) {
  return password ? field.required().oneOf([Yup.ref('password')]) : field;
}

export default Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(),
  oldPassword: Yup.string().min(6),
  password: Yup.string()
    .min(6)
    .when('oldPassword', makesPasswordRequired),
  confirmPassword: Yup.string().when('password', makesConfirmPasswordRequired),
});
