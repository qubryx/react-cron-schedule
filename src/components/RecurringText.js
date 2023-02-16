import React, { useCallback, useContext } from 'react';
import { RecurrenceContext } from '../context/recurrence-context';
import { getDateWithZero, getMonthName, getWeekday } from '../utils/dateUtils';
import { WEEKDAYS_MAP } from '../utils/weekConstants';

function ReccurringText(props) {
  	const styles = props?.styles || {}
    const {recurrenceData, dispatch} = useContext(RecurrenceContext);
    const {
        startDate,
        repeat,
        selectedWeeks,
        frequency,
        monthOption,
        selectedMonthDate,
        selectedMonthDayOrder,
        selectedMonthDay
    } = recurrenceData;

    const getOccursStartDate = useCallback(() => {
        if(!startDate) return ''
        const dateObj = new Date(startDate)
        const weekDay = getWeekday(startDate);
        const month = getMonthName(startDate);
        const date = getDateWithZero(startDate)
        return `starting ${weekDay}, ${date} ${month} ${dateObj.getFullYear()}`
    },[startDate])

    const getSelectedName = useCallback(()=> {
        let selecDays = selectedWeeks
        if(startDate){
            const startDateObj = new Date(startDate)
            selecDays = selectedWeeks 
                .filter(d => d >= startDateObj.getDay())
                .concat(selectedWeeks.filter(d => d < startDateObj.getDay()));
            }
		const name = [];
		selecDays.forEach(d => {
			const dayData = WEEKDAYS_MAP.find(day => day.value === d);
			if (dayData.name) {
				name.push(dayData.name);
			}
		});
		if (name.length > 1) {
			const l1 = name.pop();
			const l2 = name.pop();
			name.push(`${l2} and ${l1}`);
		}
		return name.join(', ');
	},[startDate, selectedWeeks]);

	if (repeat === 'weekly' && selectedWeeks?.length > 0) {
		return (
            <div style={{marginTop: 20, ...styles.recurrenceText}}>
            Occurs 
                <span style={{fontWeight: 'bold', marginLeft: 5, marginRight: 5}}>
                    every {frequency>1 ? 'weeks on': ''} {getSelectedName()}
                </span>
            {getOccursStartDate()}
            </div>
		);
	}
	if (repeat === 'monthly') {
        const occursEvery =
			monthOption === 'standard'
				? `day ${selectedMonthDate}`
				: `the ${selectedMonthDayOrder?.toLowerCase()} ${selectedMonthDay}`;

		return (
            <div style={{marginTop: 20, ...styles.recurrenceText}}>
                Occurs 
                <span style={{fontWeight: 'bold', marginLeft: 5, marginRight: 5}}>
                    {occursEvery} of every {frequency>1 ? 'months': 'month'}
                </span>
                    {getOccursStartDate()}
            </div>
		);
	}

	return <></>;
}

export default ReccurringText;
