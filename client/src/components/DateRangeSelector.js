import React, { useState, useContext } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
// import {Householdcontext} from '../context/HouseholdContext'

export default function DateRangeSelector() {
  // const { household, setHousehold } = useContext(HouseholdContext);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);
  return (
    <DateRange
      editableDateInputs={true}
      onChange={item => setState([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={state}
    />
  );
}
