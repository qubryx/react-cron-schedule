import React from 'react'
import RecurrenceComponent from './RecurrenceComponent';
import RecurrenceProvider from "../context/recurrence-context";

export const Recurrence = (props) => {

  return (
    <RecurrenceProvider>
      <RecurrenceComponent {...props} />
    </RecurrenceProvider>
  );
}

