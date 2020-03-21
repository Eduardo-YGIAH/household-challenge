import React from 'react';
// import axios from '../helperFunctions/axios.config';
import Axios from 'axios';

function useDataFetcher(url, options) {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);
    Axios.get(url, options)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          return res.data;
        } else {
          throw Error('Error fetching data!');
        }
      })
      .then(dataObj => {
        setData([dataObj]);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
  }, [url]);

  return { data, isLoading, error };
}

export default useDataFetcher;
