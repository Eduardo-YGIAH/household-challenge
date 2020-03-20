import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import * as auth from '../helperFunctions/auth';
import { navigate } from '@reach/router';
import Autocomplete from './Autocomplete';
import Button from './Button';
import Axios from 'axios';

export default function JoinHousehold() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');
  const controller = new AbortController();

  React.useEffect(() => {
    if (!user.isAuthenticated && !auth.isAuthenticated()) {
      navigate('/login');
    }

    if (!user.isAuthenticated && auth.isAuthenticated()) {
      const persistUser = auth.isAuthenticated();
      setUser(persistUser);
    }

    fetchData();

    controller.abort();
  }, []);

  const userLocal = JSON.parse(localStorage.getItem('userObj'));
  const token = userLocal.token;
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const fetchData = async () => {
    try {
      setIsLoading(true);
      let res = await fetch('/api/household-suggestions', options);
      if (res.status === 200) {
        let data = await res.json();
        if (Array.isArray(data)) {
          setSuggestions(data);
          setIsLoading(false);
        } else {
          console.log(res);
        }
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  function getData(selectedValue) {
    setValue(selectedValue);
  }

  const joinHouseholdByName = function(name, options) {
    Axios.put(`/api/household/${name}`, {}, options)
      .then(res => {
        if (res.status === 200) {
          const token = res.data.token;
          const userObj = {
            isAuthenticated: true,
            ...res.data.user,
            token,
          };
          setUser(userObj);
          localStorage.setItem('userObj', JSON.stringify(userObj));

          navigate('/member-welcome');
        } else {
          console.log('ERROR', res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const btnSendRequest = {
    label: 'Join',
    onclick: () => {
      joinHouseholdByName(value, options);
    },
    style: '',
  };

  return (
    <div className='container__task-page'>
      <h1>Join a household</h1>
      <div className='spacer__vertical'></div>
      <Autocomplete suggestions={suggestions} sendData={getData} />
      <div className='spacer__vertical'></div>
      <Button btn={btnSendRequest} />
    </div>
  );
}
