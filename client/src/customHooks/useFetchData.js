import { useState, useEffect, useContext } from 'react';
import { get } from 'mongoose';

export const useFetchData = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const user = JSON.parse(localStorage.getItem('userObj'));
  const options = {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + user.token,
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    setIsLoading(true);
    console.log('Sending GET request to: ' + url);
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch');
        }
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        setFetchedData(data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, dependencies);

  return [isLoading, fetchedData];
};
