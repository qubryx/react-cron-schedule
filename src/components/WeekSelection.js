import React, { useContext } from 'react';
import css from './WeekSelection.module.css';
import { WEEKDAYS_MAP } from '../utils/weekConstants';
import { RecurrenceContext } from '../context/recurrence-context';
import { ACTION_TYPES } from '../context/actionTypes';

function WeekSelection(props) {
  	const styles = props?.styles || {}
    const {recurrenceData, dispatch} = useContext(RecurrenceContext);
    const {selectedWeeks, disabled} = recurrenceData;


	const handleWeekDaysChange = checkedDay => {
        const newSelectedDays = selectedWeeks.includes(checkedDay)
			? selectedWeeks.filter(i => i !== checkedDay).sort()
			: selectedWeeks.concat([checkedDay]).sort();
        dispatch({type: ACTION_TYPES.SetSelectedWeeks, payload: newSelectedDays})
	};

	const handleWeekDaySelectChange = (e) => {
		let value = e?.target?.value
		if(value){
			value = Number(value)
			handleWeekDaysChange(value)
		}
	}

	return (
		<div style={styles.weekContainer}>
		<div className={css.container}>
			{WEEKDAYS_MAP.map((res, key) => {
				return (
					<div key={key} className={css.weekdayBtnContainer} style={styles.weekdayBtnContainer}>
						<button
							type="button"
                            disabled={disabled}
							value={res.value}
							className={selectedWeeks.includes(res.value) ? css.selectedWeekdayBtn : css.weekdayBtn}
							style={selectedWeeks.includes(res.value) ? styles.selectedWeekdayBtn : styles.weekdayBtn}
							onClick={event => handleWeekDaysChange(res.value)}
						>
							{res.name.slice(0, 3)}
						</button>
					</div>
				);
			})}
		</div>
		<div className={css.weekCheckBoxContainer}>
			{WEEKDAYS_MAP.map(item => (
				<label key={item.name}>
					<input 
                        disabled={disabled}
						checked={selectedWeeks.includes(item.value)}
						type="checkbox"
						onChange={handleWeekDaySelectChange}
						value={item.value}
					/>
					<span 
						className={css.weekdayFullTextLabel}
						style={selectedWeeks.includes(item.value) ? styles.selectedWeekdayFullTextLabel : styles.weekdayFullTextLabel}
					>
						{item.name}
					</span>
				</label>
			))}

		</div>			
		</div>

	);
}

export default WeekSelection;
