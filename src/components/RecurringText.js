import React, {useCallback} from 'react';
import {getDateWithZero, getMonthName, getWeekday} from '../utils/dateUtils';
import {MONTHS, WEEKDAYS_MAP} from '../utils/weekConstants';

function ReccurringText(props) {
	const {disabled = false, styles = {}, value = {}, setValue, state = {}, setState} = props;
	const {
		selectedWeeks,
		monthOption,
		selectedMonthDate,
		selectedMonthDayOrder,
		selectedMonthDay,
		month,
		startDate,
		repeat,
		frequency
	} = state;

	const getOccursStartDate = useCallback(() => {
		if (!startDate) return '';
		const dateObj = new Date(startDate);
		const weekDay = getWeekday(startDate);
		const monthName = getMonthName(startDate);
		const date = getDateWithZero(startDate);
		return `starting ${weekDay}, ${date} ${monthName} ${dateObj.getFullYear()}`;
	}, [startDate]);

	const getSelectedName = useCallback(() => {
		let selecDays = selectedWeeks;
		if (startDate) {
			const startDateObj = new Date(startDate);
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
	}, [startDate, selectedWeeks]);

	if (repeat === 'weekly' && selectedWeeks?.length > 0) {
		return (
			<div style={{marginTop: 20, ...styles.recurrenceText}}>
				Occurs
				<span style={{fontWeight: 'bold', marginLeft: 5, marginRight: 5}}>
					every {frequency > 1 ? ` ${frequency} weeks on` : ''} {getSelectedName()}
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
					{occursEvery} of every {frequency > 1 ? `${frequency} months` : 'month'}
				</span>
				{getOccursStartDate()}
			</div>
		);
	}
	if (repeat === 'yearly') {
		const occursEvery =
			monthOption === 'standard'
				? `every ${MONTHS[month]} ${selectedMonthDate} `
				: `the ${selectedMonthDayOrder?.toLowerCase()} ${selectedMonthDay} of ${MONTHS[month]} `;

		return (
			<div style={{marginTop: 20, ...styles.recurrenceText}}>
				Occurs
				<span style={{fontWeight: 'bold', marginLeft: 5, marginRight: 5}}>{occursEvery}</span>
				{getOccursStartDate()}
			</div>
		);
	}

	return <></>;
}

export default ReccurringText;
