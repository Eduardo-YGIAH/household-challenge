import React from 'react';

const useFileUploader = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = React.useState(initialValues || {});
  const [imagePreview, setImagePreview] = React.useState({});
  const [errors, setErrors] = React.useState({});

  function generatePreviewImgUrl(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = e => callback(reader.result);
  }

  const inputHandler = event => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const name = event.target.name;
    setValues({ [name]: { file } });
    generatePreviewImgUrl(file, previewImgUrl => {
      setImagePreview({ previewImgUrl });
    });
  };

  const submitHandler = event => {
    event.preventDefault();
    const e = validate(values);
    setErrors({
      ...errors,
      ...e,
    });
    onSubmit({ values, e });
  };

  return {
    values,
    imagePreview,
    errors,
    inputHandler,
    submitHandler,
  };
};

export default useFileUploader;
