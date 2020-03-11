export default function validateAuth(values) {
  let errors = {};
  //firstName Error
  if (!values.firstName) {
    errors.firstName = 'First name required';
  }
  //lastName Error
  if (!values.lastName) {
    errors.lastName = 'Last name required';
  }
  // Email Errors
  if (!values.email) {
    errors.email = 'Required Email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  // Password Errors
  if (!values.password) {
    errors.password = 'Required Password';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  //Password Confirmation Errors
  if (!values.password2) {
    errors.password2 = 'Required Matching Password';
  } else if (!(values.password === values.password2)) {
    errors.password2 = 'Passwords do not match';
  }

  return errors;
}
