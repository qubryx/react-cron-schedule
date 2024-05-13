import React from 'react';
import css from './WeekSelection.module.css';
import {WEEKDAYS_MAP} from '../utils/weekConstants';

function WeekSelection(props) {
	const {disabled = false, styles = {}, value = {}, setValue, state = {}, setState} = props;
	const {selectedWeeks} = state;

	const handleWeekDaysChange = checkedDay => {
		const newSelectedDays = selectedWeeks.includes(checkedDay)
			? selectedWeeks.filter(i => i !== checkedDay).sort()
			: selectedWeeks.concat([checkedDay]).sort();
		setState({selectedWeeks: newSelectedDays});
	};

	const handleWeekDaySelectChange = e => {
		let val = e?.target?.value;
		if (val) {
			val = Number(value);
			handleWeekDaysChange(val);
		}
	};

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
								style={
									selectedWeeks.includes(res.value) ? styles.selectedWeekdayBtn : styles.weekdayBtn
								}
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
							style={
								selectedWeeks.includes(item.value)
									? styles.selectedWeekdayFullTextLabel
									: styles.weekdayFullTextLabel
							}
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
