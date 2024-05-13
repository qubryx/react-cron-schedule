import React from 'react';
import css from './TimeSelection.module.css';

const Hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const Minutes = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
	31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59
];

function TimeSelection(props) {
	const {disabled = false, styles = {}, value = {}, setValue, state = {}, setState} = props;
	const {hour, minute} = state;

	const handleHourChange = event => {
		setValue({hour: event?.target?.value});
	};
	const handleMinuteChange = event => {
		setValue({minute: event?.target?.value});
	};

	return (
		<div className={css.mainContainer} style={styles.dateContainer}>
			<label style={styles.startLabel}>Time</label>
			<select
				key="timeHours"
				disabled={disabled}
				value={hour}
				className={css.hourDropdown}
				style={styles.hourDropdown}
				onChange={handleHourChange}
			>
				{Hours.map(item => (
					<option key={item} value={item}>
						{item > 9 ? item : `0${item}`}
					</option>
				))}
			</select>
			<select
				key="timeMinutes"
				disabled={disabled}
				value={minute}
				className={css.minuteDropdown}
				style={styles.minuteDropdown}
				onChange={handleMinuteChange}
			>
				{Minutes.map(item => (
					<option key={item} value={item}>
						{item > 9 ? item : `0${item}`}
					</option>
				))}
			</select>
		</div>
	);
}

export default TimeSelection;
