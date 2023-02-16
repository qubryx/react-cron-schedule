import React, { useContext, useEffect } from 'react';
import { ACTION_TYPES } from '../context/actionTypes';
import { RecurrenceContext } from '../context/recurrence-context';
import { getOrderNum, getScheduleSettingsFromCronExp, onMonthlyLastWeekDayCronExp, onMonthlyNthDayCronExp, onMonthlyNthWeekDayCronExp, onWeekDaysCronExp } from '../utils/cronExpression';
import DateSelection from './DateSelection';
import Frequency from "./Frequency";
import MonthSelection from "./MonthSelection";
import ReccurringText from './RecurringText';
import WeekSelection from "./WeekSelection";

function RecurrenceComponent(props) {
  const {recurrenceData, dispatch} = useContext(RecurrenceContext);
  const {
    repeat,
    selectedWeeks,
    cronExpression,
    monthOption,
    selectedMonthDate,
    selectedMonthDay,
    selectedMonthDayOrder,
    frequency,
    startDate,
    endDate,
    endCount,
    selectedEndType, 
  } = recurrenceData

    useEffect(()=> {
      let payload = {...props}
      if(props.value){
        payload = {...payload, ...props.value}
      }
      if(payload.cronExpression && payload.cronExpression !== ""){
        const schedule = getScheduleSettingsFromCronExp(payload.repeat, payload.cronExpression)
      if(payload.cronExpression && payload.cronExpression !== ""){
        }
        if(schedule) {
          payload = {...payload, ...schedule}
        }
      }
      dispatch({type: ACTION_TYPES.SetInitialProps, payload})
    },[props])

    useEffect(()=> {
      let cronExp = ''
      if(repeat === 'weekly'){
        cronExp = onWeekDaysCronExp(selectedWeeks) 
      }else if(repeat === 'monthly'){
        if(monthOption === 'custom'){
          const orderNum = getOrderNum(selectedMonthDayOrder)
          if(selectedMonthDay === 'Day'){
            if(selectedMonthDayOrder === 'Last'){
              cronExp = `0 0 L * ?`;
            }else {
              cronExp = onMonthlyNthDayCronExp(orderNum)
            }
          } else if(selectedMonthDay === 'Weekday'){
            if(selectedMonthDayOrder === 'First'){
              cronExp = `0 0 1W * ?`;
            }else if (selectedMonthDayOrder === 'Last'){
              cronExp = `0 0 LW * ?`;
            }
          } else {
            if(selectedMonthDayOrder === 'Last'){
              cronExp = onMonthlyLastWeekDayCronExp(selectedMonthDay)
            }else {
              cronExp = onMonthlyNthWeekDayCronExp(orderNum, selectedMonthDay)
            }
          }
        }else{
          cronExp = onMonthlyNthDayCronExp(selectedMonthDate)
        }
      }
      dispatch({type: ACTION_TYPES.SetCronExp, payload: cronExp})
    },[repeat,
      selectedWeeks,
      monthOption,
      selectedMonthDate,
      selectedMonthDay,
      selectedMonthDayOrder,
    ])
  
    useEffect(()=>{
      const data = {
        repeat,
        cronExpression,
        frequency,
        startDate,
      }
      if(selectedEndType==='date'){
        data.endDate = endDate
      }else if(selectedEndType==='count'){
        data.endCount = endCount 
      }
      if(props.onChange){
        props.onChange(data)
      }
    },[
      repeat,
      cronExpression,
      frequency,
      startDate,
      endDate,
      endCount,
      selectedEndType
    ])
    return (
        <div style={props?.styles?.root}>
          <Frequency {...props} />
          {repeat === 'weekly' ?
          <WeekSelection {...props} />
          :(repeat === 'monthly' ?
          <MonthSelection {...props} />
          : null)}
          <DateSelection {...props} />
          <ReccurringText {...props} />
          {props.showCronExpression && (
          <div style={{marginTop: 20}}>
            {cronExpression}
          </div>
          )}
        </div>
    );
}


export default RecurrenceComponent;

