const axios = require('axios');
const user = JSON.parse(localStorage.getItem('userObj'));
axios.defaults.headers.common = { Authorization: `Bearer ${user.token}` };
export default axios;
