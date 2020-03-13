exports.updateUserStateAndStorage = (setState, value) => {
  localStorage.setItem('userObj', JSON.stringify(value));
  setState(value);
};

exports.isAuthenticated = () => {
  return JSON.parse(localStorage.getItem('userObj'));
};

exports.logout = () => {
  localStorage.removeItem('userObj');
};
