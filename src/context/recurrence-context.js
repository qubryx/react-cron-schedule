import React, {createContext, useReducer} from 'react'
import { getFormattedCurrentDate } from '../utils/commonFns';
import {reducer} from './reducer';

export const RecurrenceContext = createContext({});

const initialState = {
    repeat: 'weekly', // weekly, monthly
    frequency: 1, 
    selectedWeeks: [new Date().getDay()], // [0,1,2,3,4,5,6]
    monthOption: 'standard', // standard, custom 
    selectedMonthDate: new Date().getDate(), // 1,2,3, etc
    selectedMonthDayOrder: 'First',
    selectedMonthDay: 'Day', // Monday, etc or Day or Weekday
    selectedEndType: 'noend', // noend, date, count
    startDate: getFormattedCurrentDate(),
    endDate: getFormattedCurrentDate(),
    endCount: 10,
    disabled: false,
    showFrequency: true,
    cronExpression: ''
}

export default props => {
    const [recurrenceData, dispatch] = useReducer(reducer, initialState)
    return (
        <RecurrenceContext.Provider value={{recurrenceData,dispatch}} >
            {props.children}
        </RecurrenceContext.Provider>
    );
}