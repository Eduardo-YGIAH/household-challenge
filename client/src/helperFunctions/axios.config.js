const axios = require('axios');
const user = JSON.parse(localStorage.getItem('userObj'));
if (!user) {
  axios.defaults.headers.common = { Authorization: `` };
} else if (user) {
  axios.defaults.headers.common = { Authorization: `Bearer ${user.token}` };
}
export default axios;
