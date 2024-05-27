import {MONTH_DAY_TYPES, MONTH_OPTIONS, ORDERS, REPEAT_OPTIONS, WEEKDAYS_MAP} from './constants';

// min, hour, day, month, week
export const onWeekDaysCronExp = days => {
	// 0 0 ? * 2,3 - For every Tue and Wed
	if (days && days.length > 0) {
		if (days.length === 7) {
			return '0 0 ? * ?';
		}
		days.sort();
		return `0 0 ? * ${days.join(',')}`;
	}
	return '';
};

export const onTimeCronExp = (minute, hour, exps) => {
	if(exps?.length > 0){
		return exps.map(exp => {
			const cronExp = exp.split(' ');
			cronExp[0] = `${minute}`;
			cronExp[1] = `${hour}`;
			return cronExp.join(' ') 
		})
	}
	return exps;
};

export const onMonthlyCronExp = (months, exps) => {
	if(exps?.length > 0){
		const monthsStr = `${months.map(m => Number(m) + 1)}`;
		return exps.map(exp => {
			const cronExp = exp.split(' ');
			cronExp[3] = monthsStr
			return cronExp.join(' ') 
		})
	}
	return exps;
};

export const onMonthlyNthDayCronExp = (dayDate) => {
	// 0 0 1 * ? - For every 1st Day of the month
	if (dayDate && dayDate >= 1 && dayDate <= 31) {
		return `0 0 ${dayDate} * ?`;
	}
	return '';
};

export const onMonthlyLastWeekDayCronExp = dayName => {
	// 0 0 ? * 5L - For every last Friday of the month
	const dayData = WEEKDAYS_MAP.find(day => day.name === dayName);
	const dayNum = dayData?.value;
	if (dayNum >= 0 && dayNum <= 6) {
		return `0 0 ? * ${dayNum}L`;
	}
	return '';
};

export const onMonthlyNthWeekDayCronExp = (order, dayName) => {
	// 0 0 ? * 3#4 - For every 4th Thursday of the month
	const dayData = WEEKDAYS_MAP.find(day => day.name === dayName);
	const dayNum = dayData?.value;
	if (order >= 1 && order <= 4 && dayNum >= 0 && dayNum <= 6) {
		return `0 0 ? * ${dayNum}#${order}`;
	}
	return '';
};

export const getOrderNum = order => {
	return order === ORDERS.FIRST ? 1 : order === ORDERS.SECOND ? 2 : order === ORDERS.THIRD ? 3 : order === ORDERS.FOURTH ? 4 : 5;
};

const getOrderText = order => {
	return order === 1 || order === '1'
		? ORDERS.FIRST
		: order === 2 || order === '2'
		? ORDERS.SECOND
		: order === 3 || order === '3'
		? ORDERS.THIRD
		: order === 4 || order === '4'
		? ORDERS.FOURTH
		: ORDERS.LAST;
};

const getWeekNumber = week => {
	const weekNumber =
		week?.toUpperCase() === 'SUN'
			? 0
			: week?.toUpperCase() === 'MON'
			? 1
			: week?.toUpperCase() === 'TUE'
			? 2
			: week?.toUpperCase() === 'WED'
			? 3
			: week?.toUpperCase() === 'THU'
			? 4
			: week?.toUpperCase() === 'FRI'
			? 5
			: week?.toUpperCase() === 'SAT'
			? 6
			: undefined;
	return weekNumber;
};

export const getScheduleSettingsFromCronExp = (repeat, cronExps, isFullWeek) => {
	// min, hour, day, month, week
	const schedule = {};
	if (cronExps?.length > 1){
		// Currently supporting morethan one expression is only for multiple week days selection
		// ['0 0 ? * 1#2', '0 0 ? * 3#2','0 0 ? * 5#2']
		const validExp = cronExps.every(expression => {
			const parts = expression.split(' ');
			return parts[2] === '?' && (parts[4].includes('L') || parts[4].includes('#'));
		});
		if(validExp) {
			schedule.monthOption = MONTH_OPTIONS.CUSTOM
			schedule.selectedMonthDay = MONTH_DAY_TYPES.SELECT_DAYS_MANUALLY
			const firstExpArr = cronExps[0]?.split(' ')
			schedule.minute = firstExpArr[0];
			schedule.hour = firstExpArr[1];
			const firstExpWeekDays = firstExpArr[4]
			schedule.selectedMonthDayOrder = firstExpWeekDays.includes('L') ? ORDERS.LAST : getOrderText(firstExpWeekDays.charAt(firstExpWeekDays.length - 1))
			schedule.selectedWeeks = cronExps.map(expression => {
				const parts = expression.split(' ');
				return Number(parts[4].slice(0,1));
			});
			return schedule
		}
		return schedule
	}
	const cronExp = cronExps[0];
	if (!cronExp) return {};
	const cronArr = cronExp.split(' ');
	if (cronArr.length < 5) return {};

	// Find rType
	const weekDays = cronArr[4];
	const month = cronArr[3];
	const day = cronArr[2];
	const hour = cronArr[1];
	const minute = cronArr[0];
	schedule.hour = hour;
	schedule.minute = minute;
	if (repeat === REPEAT_OPTIONS.WEEKLY) {
		// weekday === ? (daily), L and # includes means monthly
		schedule.selectedWeeks = weekDays === '?' ? [0, 1, 2, 3, 4, 5, 6] : weekDays.split(',').map(i => Number(i));
		if (weekDays === '?') {
			schedule.selectedWeeks = [0, 1, 2, 3, 4, 5, 6];
			return schedule;
		}
		const weekDaysNumArr = [];
		weekDays.split(',').forEach(item => {
			if (!Number.isNaN(item) && !Number.isNaN(parseFloat(item))) {
				weekDaysNumArr.push(Number(item));
			} else {
				const weekNum = getWeekNumber(item);
				if (weekNum) weekDaysNumArr.push(weekNum);
			}
		});
		schedule.selectedWeeks = weekDaysNumArr;
		return schedule;
	}
	if ([REPEAT_OPTIONS.MONTHLY, REPEAT_OPTIONS.YEARLY].includes(repeat)) {
		if(isFullWeek){
			// '0 0 ? * 6L' or '0 0 ? * 0#2'
			schedule.monthOption = MONTH_OPTIONS.CUSTOM
			schedule.month = getMonthNumber(month, repeat);
			const weekdayNum = Number(weekDays.slice(0,1));
			if(weekDays.includes("L")){
				schedule.selectedMonthDayOrder = ORDERS.LAST;
				schedule.selectedMonthDay = weekdayNum === 5 ? MONTH_DAY_TYPES.FULL_WORKING_WEEK : MONTH_DAY_TYPES.FULL_WEEK ;
			} else if(weekDays.includes("#")) {
				schedule.selectedMonthDayOrder = getOrderText(weekDays.charAt(weekDays.length - 1));
				schedule.selectedMonthDay = weekdayNum === 1 ? MONTH_DAY_TYPES.FULL_WORKING_WEEK : MONTH_DAY_TYPES.FULL_WEEK ;
			}
			return schedule
		}
		if (weekDays === '?' && !isNaN(day) && !isNaN(parseFloat(day))) {
			// '0 0 16 * ?'
			// first day is considered as the standard day 1.
			schedule.monthOption = MONTH_OPTIONS.STANDARD;
			schedule.selectedMonthDate = Number(day);
			schedule.month = getMonthNumber(month, repeat);
			return schedule;
		}

		schedule.monthOption = MONTH_OPTIONS.CUSTOM;
		if (weekDays === '?') {
			if (day.includes('L')) {
				schedule.selectedMonthDayOrder = ORDERS.LAST;
			}
			if (day.includes('W')) {
				// '0 0 LW * ?' or '0 0 1W * ?'
				schedule.selectedMonthDay = MONTH_DAY_TYPES.WEEKDAY;
				schedule.selectedMonthDayOrder = getOrderText(day.slice(0, 1));
			} else {
				// '0 0 L * ?'
				schedule.selectedMonthDay = MONTH_DAY_TYPES.DAY;
			}
		} else if (weekDays.includes('L')) {
			// '0 0 ? * 5L' - Last weekday of the month
			schedule.selectedWeeks = [ Number(weekDays.slice(0,1)) ]
			schedule.selectedMonthDay = MONTH_DAY_TYPES.SELECT_DAYS_MANUALLY;
			schedule.selectedMonthDayOrder = ORDERS.LAST;
		} else if (weekDays.includes('#')) {
			// '0 0 ? * 3#4' - weeekday First/Second/etc of the month
			schedule.selectedMonthDayOrder = getOrderText(weekDays.charAt(weekDays.length - 1));
			const weekDayData = WEEKDAYS_MAP.find(item => item.value === Number(weekDays.slice(0, 1)));
			schedule.selectedMonthDay = weekDayData?.name;
		}
		schedule.month = getMonthNumber(month, repeat);
		return schedule;
	}
	return schedule;
};

const getMonthNumber = (months, rType) => {
	let monthNumber = [new Date().getMonth()];
	// eslint-disable-next-line no-restricted-globals
	if (months !== '*' && isValidCommaSeparatedNumber(months) && rType === REPEAT_OPTIONS.YEARLY) {
		monthNumber = months.split(',').map(m => Number(m) - 1);
	}
	return monthNumber;
};

function isValidCommaSeparatedNumber(str) {
	return str.split(',').every(num => !isNaN(num.trim()) && !isNaN(parseFloat(num.trim())));
}