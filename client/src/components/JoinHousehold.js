import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import * as auth from '../helperFunctions/auth';
import { navigate } from '@reach/router';
import Autocomplete from './Autocomplete';
import Button from './Button';
import Axios from '../helperFunctions/axios.config';

export default function JoinHousehold() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log('rendering Auth useEffect on Join Household');
    function checkAuth() {
      if (!user.isAuthenticated && !auth.isAuthenticated()) {
        navigate('/login');
      }
      if (!user.isAuthenticated && auth.isAuthenticated()) {
        const persistUser = auth.isAuthenticated();
        setUser(prevUser => {
          return { ...prevUser, ...persistUser };
        });
      }
      if (user.isAuthenticated) {
        if (user.isMemberOf.length > 0) {
          navigate('/member-welcome');
        }
        if (user.isOwner.length > 0) {
          navigate('/members');
        }
      }
    }
    checkAuth();
  });

  useEffect(() => {
    const abortController = new AbortController();
    console.log('Rendering Suggestions fetcher useEffect');
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let res = await fetch('/api/household-suggestions', {
          signal: abortController.signal,
          headers: { Authorization: `Bearer ${user.token}` },
        });
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
    if (user.isAuthenticated) {
      fetchData();
    }
    return () => {
      abortController.abort();
    };
  }, [user.token, user.isAuthenticated]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  function getData(selectedValue) {
    setValue(selectedValue);
  }

  const joinHouseholdByName = function(name) {
    Axios.put(`/api/household/${name}`)
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
      joinHouseholdByName(value);
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
