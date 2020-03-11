import React from 'react';

function useFormValidation(initialState, validate, callback) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        setSubmitting(false);
        // TODO: ADD SERVER SIDE VALIDATION HERE;
      } else {
        return;
      }
    }
    // eslint-disable-next-line
  }, [errors]);

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    const validationErrors = validate(values);
    setErrors(validationErrors);
    const noErrors = Object.keys(errors).length === 0;
    if (noErrors) {
      setSubmitting(false);
    }
  }

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
    const noErrors = Object.keys(errors).length === 0;
    if (!noErrors || values === initialState) {
      console.log('NOT ALLOWED');
    } else {
      callback();
      setValues(initialState);
    }
  }

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting,
  };
}

export default useFormValidation;
