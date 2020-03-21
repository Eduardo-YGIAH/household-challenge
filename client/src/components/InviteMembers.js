import React, { useContext } from 'react';
import useForm from '../customHooks/useForm';
import { UserContext } from '../context/UserContext';
import { navigate, Link } from '@reach/router';
import * as auth from '../helperFunctions/auth';
import axios from 'axios';
import './InviteMembers.scss';


export default function Invite() {
  const { user, setUser } = useContext(UserContext);
  // const [state, setState] = useState()

  React.useEffect(() => {
    if (!user.isAuthenticated && !auth.isAuthenticated()) {
      navigate('/login');
    }
    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }
  });
  
  const { values, handleChange, handleSubmit, errors } = useForm({
    initialValues: {
      name: '',
      email: ''
    },
    onSubmit(values, errors) {
      if (errors) {
        alert(JSON.stringify({ values, errors }, null, 2));
      } else {
        const options = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const payload = {
          name: values.values.name,
          email: values.values.email
        };
        axios
          .post('api/invite-members', payload, options)
          .then(res => {
            if (res.status === 200) {
              console.log('Email sent!', res.data);
              const token = res.data.token;
              const userObj = {
                isAuthenticated: true,
                ...res.data.user,
                token,
              };
              setUser(userObj);
              localStorage.setItem('userObj', JSON.stringify(userObj));

              navigate('/members');
            } else {
              console.log("ERROR", res);
            }
          })
          .catch(error => {
            console.log('EMAIL ERROR', error);
          });
      }
    } ,
    validate (values) {
      const errors = {};
      if (values.name === '') {
        errors.name = "Please enter the recipients name";
      }
      if (values.email === '') {
        errors.email = "Please enter a valid email";
      }
      return errors;
    }
  });


  return (
    <div className='invite-form-container'> 
      <h1>Invite Members to </h1>
      <form onSubmit={handleSubmit} className='invite-form'>
        <div className='invite-form-group'>
          <label>Name</label>
          {errors.name && <p className='error-text'>{errors.name}</p>}
          <input
            className={errors.name && 'error-input'}
            type='text'
            name='name'
            onChange={handleChange}
            value={values.name}
          />
        </div>
        <div className='invite-form-group'>
          <label>Invitee Email </label>
          {errors.email && <p className='error-text'>{errors.email}</p>}
          <input
            autoComplete='off'
            className={errors.email && 'error-input'}
            type='email'
            name='email'
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <button className='btn' type='submit'>
          Send Invite
        </button>
        <br />
        <div className='link'>
          <Link to='/members'>Members</Link>
        </div>
      </form>
    </div>
  )

}