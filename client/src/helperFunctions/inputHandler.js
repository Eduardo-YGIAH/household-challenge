exports.handleInputChange = event => {
  event.persist();
  setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
};
