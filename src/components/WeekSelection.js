import React from 'react';
import WeekSelectionComponent from './WeekSelectionComponent';
import { ORDERS, REPEAT_OPTIONS, REPEAT_TYPES } from '../utils/constants';

function WeekSelection(props) {
	const {disabled = false, styles = {}, state = {}, setState, setValue} = props;
	const {selectedWeeks, repeat, isRepeatForDisabled, selectedMonthDayOrder} = state;

	const handleWeekDaysChange = checkedDay => {
		const newSelectedDays = selectedWeeks.includes(checkedDay)
			? selectedWeeks.filter(i => i !== checkedDay).sort()
			: selectedWeeks.concat([checkedDay]).sort();
		setState({selectedWeeks: newSelectedDays });
		if(repeat !== REPEAT_OPTIONS.WEEKLY && !isRepeatForDisabled && newSelectedDays?.length>1){
			setValue({
				repeatFor: selectedMonthDayOrder === ORDERS.LAST ? 1 : 2,
				repeatForType: REPEAT_TYPES.WEEKS
			})
		}
	};

	return (
		<WeekSelectionComponent 
			disabled={disabled}
			styles={styles}
			selectedWeeks={selectedWeeks}
			onClick={handleWeekDaysChange}
		/>
	);
}

export default WeekSelection;
