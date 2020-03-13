import React, { useState, createContext } from 'react';

const HouseholdContext = createContext({ household: {}, setHousehold: () => {} });

const HouseholdContextProvider = props => {
  const initialState = {
    title: '',
    owner: '',
    challenges: [],
  };

  const [household, setHousehold] = useState(initialState);
  const value = { household, setHousehold };
  return <HouseholdContext.Provider value={value}>{props.children}</HouseholdContext.Provider>;
};

const HouseholdContextConsumer = HouseholdContext.Consumer;

export { HouseholdContext, HouseholdContextProvider, HouseholdContextConsumer };
