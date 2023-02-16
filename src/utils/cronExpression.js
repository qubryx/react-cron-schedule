import { WEEKDAYS_MAP } from "./weekConstants";

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

export const onMonthlyNthDayCronExp = dayDate => {
	// 0 0 1 * ? - For every 1st Day of the month
	if (dayDate && dayDate >= 1 && dayDate <= 31) {
		return `0 0 ${dayDate} * ?`;
	}
	return '';
};

export const onMonthlyLastWeekDayCronExp = dayName => {
	// 0 0 ? * 5L - For every last Friday of the month
    const dayData = WEEKDAYS_MAP.find(day => day.name === dayName)
    const dayNum = dayData?.value;
	if (dayNum >= 0 && dayNum <= 6) {
		return `0 0 ? * ${dayNum}L`;
	}
	return '';
};

export const onMonthlyNthWeekDayCronExp = (order, dayName) => {
	// 0 0 ? * 3#4 - For every 4th Thursday of the month
    const dayData = WEEKDAYS_MAP.find(day => day.name === dayName)
    const dayNum = dayData?.value;
	if (order >= 1 && order <= 4 && dayNum >= 0 && dayNum <= 6) {
		return `0 0 ? * ${dayNum}#${order}`;
	}
	return '';
};

export const getOrderNum = order => {
	return order === 'First'
			? 1
			: order === 'Second'
			? 2
			: order === 'Third'
			? 3
			: order === 'Fourth'
			? 4 : 5;
};

const getOrderText = order => {
	return order === 1 || order === '1'
			? 'First' 
			: order === 2 || order === '2'
			? 'Second' 
			: order === 3 || order === '3'
			? 'Third'
			: order === 4 || order === '4'
			? 'Fourth'
			: 'Last';
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

export const getScheduleSettingsFromCronExp = (repeat, cronExp) => {
	// min, hour, day, month, week
	if (!cronExp) return {};
	const cronArr = cronExp.split(' ');
	if(cronArr.length < 5) return {};

	const schedule = {};
	// Find rType
	const weekDays = cronArr[4];
	const month = cronArr[3];
	const day = cronArr[2];
	if (repeat === 'weekly') {
		// weekday === ? (daily), L and # includes means monthly
		schedule.selectedWeeks =
			weekDays === '?' ? [0, 1, 2, 3, 4, 5, 6] : weekDays.split(',').map(i => Number(i));
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
	if (month === '*' && repeat === 'monthly') {
		if (weekDays === '?' && !isNaN(day) && !isNaN(parseFloat(day))) {
			// '0 0 16 * ?'
			// first day is considered as the standard day 1.
			schedule.monthOption = 'standard';
			schedule.selectedMonthDate = Number(day);
			return schedule;
		}
		schedule.monthOption = 'custom';
		if (weekDays === '?') {
			if (day.includes('L')) {
				schedule.selectedMonthDayOrder = 'Last';
			}
			if (day.includes('W')) {
				// '0 0 LW * ?' or '0 0 1W * ?'
				schedule.selectedMonthDay = 'Weekday';
				schedule.selectedMonthDayOrder = getOrderText(day.slice(0, 1));
			} else {
				// '0 0 L * ?'
				schedule.selectedMonthDay = 'Day';
			}
		} else if (weekDays.includes('L')) {
			// '0 0 ? * 5L' - Last weekday of the month
			const weekDayData = WEEKDAYS_MAP.find(item => item.value === Number(weekDays.slice(0, 1)));
			schedule.selectedMonthDay = weekDayData?.name;
		} else if (weekDays.includes('#')) {
			// '0 0 ? * 3#4' - weeekday First/Second/etc of the month
			schedule.selectedMonthDayOrder = getOrderText(weekDays.charAt(weekDays.length - 1));
			const weekDayData = WEEKDAYS_MAP.find(item => item.value === Number(weekDays.slice(0, 1)));
			schedule.selectedMonthDay = weekDayData?.name;
		}
		return schedule;
	}
	return schedule;
};
