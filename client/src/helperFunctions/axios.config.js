import Axios from 'axios';
import * as auth from './auth.js';
const user = JSON.parse(localStorage.getItem('userObj'));

if (!auth.isAuthenticated()) {
  Axios.defaults.headers.common = { Authorization: `` };
}
if (auth.isAuthenticated()) {
  Axios.defaults.headers.common = { Authorization: `Bearer ${user.token}` };
}

export default Axios;
