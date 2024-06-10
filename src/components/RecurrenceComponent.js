import React, {useEffect, useState} from 'react';
import {
	getOrderNum,
	getScheduleSettingsFromCronExp,
	onMonthlyCronExp,
	onMonthlyNthDayCronExp,
	onTimeCronExp,
	onWeekDaysCronExp
} from '../utils/cronExpression';
import DateSelection from './DateSelection';
import Frequency from './Frequency';
import MonthSelection from './MonthSelection';
import ReccurringText from './RecurringText';
import TimeSelection from './TimeSelection';
import WeekSelection from './WeekSelection';
import RepeatFor from './RepeatFor';
import AdditionalOptions from './AdditionalOptions';
import { END_TYPES, MONTH_DAY_TYPES, MONTH_OPTIONS, ORDERS, REPEAT_OPTIONS } from '../utils/constants';
import { getEndDateFromCount } from '../utils/parseCronExpression';

const initialState = {
	selectedWeeks: [new Date().getDay()], // [0,1,2,3,4,5,6]
	monthOption: MONTH_OPTIONS.STANDARD, // standard, custom
	selectedMonthDate: new Date().getDate(), // 1,2,3, etc
	selectedMonthDayOrder: ORDERS.FIRST,
	selectedMonthDay: MONTH_DAY_TYPES.DAY, // or Day or Weekday etc
	hour: 0,
	minute: 0,
	months: [new Date().getMonth()], // for yearly
	startDate: new Date(),
	endDate: new Date(),
	repeat: REPEAT_OPTIONS.WEEKLY,
	frequency: 1,
	repeatFor: undefined, 
	repeatForType: undefined,
	isRepeatForDisabled: true,
	selectedEndType: END_TYPES.NO_END,
	endCount: 10,
	countEndDate: undefined,
	cronExpression: [],
	isAdditionalOptionsActive: false,
	skipFrom: undefined,
	skipTo: undefined,
	isFullWeek: false,
};

function RecurrenceComponent(props) {
	const {value = {}} = props;
	const [state, setState] = useState(initialState);

	useEffect(() => {
		let data = initialState;
		if (value) {
			data = {...data, ...value};
		}
		if (value?.cronExpression?.length > 0) {
			const schedule = getScheduleSettingsFromCronExp(value?.repeat, value?.cronExpression, value?.isFullWeek);
			let countEndDate = undefined
			if(value?.selectedEndType === END_TYPES.COUNT && value?.endCount > 0){
				countEndDate = getEndDateFromCount(
					value.cronExpression,
					value.endCount,
					value.frequency,
					value.repeat,
					value.startDate,
					value.repeatFor,
					value.repeatForType,
					value.skipFrom,
					value.skipTo,
					value.isFullWeek
				)
			}
			if (schedule) {
				data = {
					...data,
					...schedule,
					isRepeatForDisabled: !value?.repeatFor || value?.repeatFor <= 1,
					isAdditionalOptionsActive: (value?.skipFrom && value.skipTo),
					countEndDate
				};
			}
		}
		setState(data);
	}, [props?.key]);

	useEffect(() => {
		let cronExp = [];
		if (state?.repeat === REPEAT_OPTIONS.WEEKLY) {
			cronExp = [onWeekDaysCronExp(state.selectedWeeks)];
		} else if (state?.repeat === REPEAT_OPTIONS.MONTHLY || state?.repeat === REPEAT_OPTIONS.YEARLY) {
			if (state.monthOption === MONTH_OPTIONS.CUSTOM) {
				const orderNum = getOrderNum(state.selectedMonthDayOrder);
				if (state.selectedMonthDay === MONTH_DAY_TYPES.DAY) {
					if (state.selectedMonthDayOrder === ORDERS.LAST) {
						cronExp = [`0 0 L * ?`];
					} else {
						cronExp = [onMonthlyNthDayCronExp(orderNum)];
					}
				} else if (state.selectedMonthDay === MONTH_DAY_TYPES.WEEKDAY) {
					if (state.selectedMonthDayOrder === ORDERS.FIRST) {
						cronExp = [`0 0 1W * ?`];
					} else if (state.selectedMonthDayOrder === ORDERS.LAST) {
						cronExp = [`0 0 LW * ?`];
					}
				} else if (state.selectedMonthDay === MONTH_DAY_TYPES.FULL_WEEK){
					if (state.selectedMonthDayOrder === ORDERS.LAST) {
						cronExp = [`0 0 ? * 6L`];
					} else {
						cronExp = [`0 0 ? * 0#${orderNum}`];
					} 
				} else if (state.selectedMonthDay === MONTH_DAY_TYPES.FULL_WORKING_WEEK){
					if (state.selectedMonthDayOrder === ORDERS.LAST) {
						cronExp = [`0 0 ? * 5L`];
					} else {
						cronExp = [`0 0 ? * 1#${orderNum}`];
					} 
				} else if (state.selectedMonthDay === MONTH_DAY_TYPES.SELECT_DAYS_MANUALLY){
					cronExp = state.selectedWeeks.map(weekDay => {
						if (state.selectedMonthDayOrder === ORDERS.LAST) {
							return `0 0 ? * ${weekDay}L`;
						} else {
							return `0 0 ? * ${weekDay}#${orderNum}`;
						}
					})
				}
			} else {
				cronExp = [onMonthlyNthDayCronExp(state.selectedMonthDate)];
			}
			if (state?.repeat === REPEAT_OPTIONS.YEARLY) {
				cronExp = onMonthlyCronExp(state.months, cronExp);
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
		state.months,
	]);

	useEffect(()=>{
		let countEndDate = undefined
		if(state.selectedEndType === END_TYPES.COUNT && state.endCount > 0) {
			countEndDate = getEndDateFromCount(
				state.cronExpression,
				state.endCount,
				state.frequency,
				state.repeat,
				state.startDate,
				state.repeatFor,
				state.repeatForType,
				state.skipFrom,
				state.skipTo,
				state.isFullWeek
			)
		}
		setStateData({countEndDate});


	},[
		state.selectedEndType,
		state.cronExpression,
		state.endCount,
		state.frequency,
		state.repeat,
		state.startDate,
		state.repeatFor,
		state.repeatForType,
		state.skipFrom,
		state.skipTo,
		state.isFullWeek
	])

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
			{state?.repeat === REPEAT_OPTIONS.WEEKLY ? (
				<WeekSelection
					{...props}
					setValue={setValue}
					state={state}
					setState={setStateData}
				/>
			) : state?.repeat === REPEAT_OPTIONS.MONTHLY || state?.repeat === REPEAT_OPTIONS.YEARLY ? (
				<>
				<MonthSelection {...props} setValue={setValue} state={state} setState={setStateData} />
				{ state.selectedMonthDay === MONTH_DAY_TYPES.SELECT_DAYS_MANUALLY && state.monthOption === MONTH_OPTIONS.CUSTOM && 
					<WeekSelection
						{...props}
						setValue={setValue}
						state={state}
						setState={setStateData}
					/>
				}
				{!(state.selectedMonthDayOrder === ORDERS.LAST && state.monthOption === MONTH_OPTIONS.CUSTOM) &&
				<RepeatFor {...props} setValue={setValue} state={state} setState={setStateData}/>
}
				</>
			) : null}
			<DateSelection {...props} setValue={setValue} state={state} setState={setStateData} />
			<TimeSelection {...props} setValue={setValue} state={state} setState={setStateData} />
			{(
				(state?.repeat === REPEAT_OPTIONS.MONTHLY || state?.repeat === REPEAT_OPTIONS.YEARLY) &&
				(state?.monthOption === MONTH_OPTIONS.STANDARD 
					|| (state?.monthOption === MONTH_OPTIONS.CUSTOM && state?.selectedMonthDayOrder !== ORDERS.LAST && [MONTH_DAY_TYPES.DAY, MONTH_DAY_TYPES.WEEKDAY].includes(state?.selectedMonthDay))
				)
			) &&
				<AdditionalOptions {...props} setValue={setValue} state={state} setState={setStateData}/>
			}
			<ReccurringText {...props} setValue={setValue} state={state} setState={setStateData} />
			{props.showCronExpression && <div style={{marginTop: 20}}>{state?.cronExpression}</div>}
		</div>
	);
}

export default RecurrenceComponent;
