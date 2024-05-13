import React, {useEffect, useState} from 'react';
import {
	getOrderNum,
	getScheduleSettingsFromCronExp,
	onMonthlyCronExp,
	onMonthlyLastWeekDayCronExp,
	onMonthlyNthDayCronExp,
	onMonthlyNthWeekDayCronExp,
	onTimeCronExp,
	onWeekDaysCronExp
} from '../utils/cronExpression';
import DateSelection from './DateSelection';
import Frequency from './Frequency';
import MonthSelection from './MonthSelection';
import ReccurringText from './RecurringText';
import TimeSelection from './TimeSelection';
import WeekSelection from './WeekSelection';

const initialState = {
	selectedWeeks: [new Date().getDay()], // [0,1,2,3,4,5,6]
	monthOption: 'standard', // standard, custom
	selectedMonthDate: new Date().getDate(), // 1,2,3, etc
	selectedMonthDayOrder: 'First',
	selectedMonthDay: 'Day', // Monday, etc or Day or Weekday
	hour: 0,
	minute: 0,
	month: new Date().getMonth(), // for yearly
	startDate: new Date(),
	endDate: new Date(),
	repeat: 'weekly',
	frequency: 1,
	selectedEndType: 'noend',
	endCount: 10,
	cronExpression: ''
};

function RecurrenceComponent(props) {
	const {value = {}} = props;
	const [state, setState] = useState(initialState);

	useEffect(() => {
		let data = initialState;
		if (value) {
			data = {...data, ...value};
		}
		if (value?.cronExpression && value?.cronExpression !== '') {
			const schedule = getScheduleSettingsFromCronExp(value?.repeat, value?.cronExpression);
			if (schedule) {
				data = {...data, ...schedule};
			}
		}
		setState(data);
	}, [props?.key]);

	useEffect(() => {
		let cronExp = '';
		if (state?.repeat === 'weekly') {
			cronExp = onWeekDaysCronExp(state.selectedWeeks);
		} else if (state?.repeat === 'monthly' || state?.repeat === 'yearly') {
			if (state.monthOption === 'custom') {
				const orderNum = getOrderNum(state.selectedMonthDayOrder);
				if (state.selectedMonthDay === 'Day') {
					if (state.selectedMonthDayOrder === 'Last') {
						cronExp = `0 0 L * ?`;
					} else {
						cronExp = onMonthlyNthDayCronExp(orderNum);
					}
				} else if (state.selectedMonthDay === 'Weekday') {
					if (state.selectedMonthDayOrder === 'First') {
						cronExp = `0 0 1W * ?`;
					} else if (state.selectedMonthDayOrder === 'Last') {
						cronExp = `0 0 LW * ?`;
					}
				} else if (state.selectedMonthDayOrder === 'Last') {
					cronExp = onMonthlyLastWeekDayCronExp(state.selectedMonthDay);
				} else {
					cronExp = onMonthlyNthWeekDayCronExp(orderNum, state.selectedMonthDay);
				}
			} else {
				cronExp = onMonthlyNthDayCronExp(state.selectedMonthDate);
			}
			if (state?.repeat === 'yearly') {
				cronExp = onMonthlyCronExp(state.month, cronExp);
			}
		}
		cronExp = onTimeCronExp(state.minute, state.hour, cronExp);
		setValue({cronExpression: cronExp});
		setStateData({cronExpression: cronExp});
	}, [
		state?.repeat,
		state.selectedWeeks,
		state.monthOption,
		state.selectedMonthDate,
		state.selectedMonthDayOrder,
		state.selectedMonthDay,
		state.hour,
		state.minute,
		state.month
	]);

	const setStateData = data => {
		setState(prev => {
			return {
				...prev,
				...data
			};
		});
	};

	const setValue = data => {
		if (props?.onChange) {
			props?.onChange({
				...state,
				...data
			});
		}
		setStateData(data);
	};

	return (
		<div style={props?.styles?.root}>
			<Frequency {...props} setValue={setValue} state={state} setState={setStateData} />
			{state?.repeat === 'weekly' ? (
				<WeekSelection {...props} setValue={setValue} state={state} setState={setStateData} />
			) : state?.repeat === 'monthly' || state?.repeat === 'yearly' ? (
				<MonthSelection {...props} setValue={setValue} state={state} setState={setStateData} />
			) : null}
			<DateSelection {...props} setValue={setValue} state={state} setState={setStateData} />
			<TimeSelection {...props} setValue={setValue} state={state} setState={setStateData} />
			<ReccurringText {...props} setValue={setValue} state={state} setState={setStateData} />
			{props.showCronExpression && <div style={{marginTop: 20}}>{state?.cronExpression}</div>}
		</div>
	);
}

export default RecurrenceComponent;
