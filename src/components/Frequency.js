import React from 'react';
import css from './Frequency.module.css';
import {MONTHS} from '../utils/weekConstants';

const repeatOptions = ['weekly', 'monthly', 'yearly'];
const MonthValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function Frequency(props) {
	const {disabled = false, styles = {}, value = {}, setValue, state = {}, setState} = props;
	const {month, repeat, frequency} = state;

	const handleRepeatClick = event => {
		setValue({repeat: event?.target?.value, frequency: event.target.value === 'yearly' ? 1 : Number(frequency)});
	};

	const handleFrequencyChange = event => {
		setValue({frequency: Number(event?.target?.value)});
	};

	const handleMonthChange = event => {
		setState({month: Number(event?.target?.value)});
	};

	return (
		<div className={css.mainContainer} style={styles.frequencyContainer}>
			<div>
				<label className={css.repeatLabel} style={styles.repeatLabel}>
					Repeat
				</label>
				<select
					key="repeat"
					style={styles.repeatDropdown}
					disabled={disabled}
					value={repeat}
					className={css.repeatDropdown}
					name="repeat"
					id="repeat"
					onChange={handleRepeatClick}
				>
					{repeatOptions.map(item => (
						<option key={item} value={item}>
							{item}
						</option>
					))}
				</select>
			</div>
			<div className={css.frequencyContainer}>
				<label className={css.everyLabel} style={styles.everyLabel}>
					Every
				</label>
				{repeat === 'yearly' ? (
					<select
						key="months"
						style={styles.monthDropdown}
						disabled={disabled}
						value={month}
						className={css.monthDropdown}
						name="months"
						id="months"
						onChange={handleMonthChange}
					>
						{MonthValues.map(item => (
							<option key={item} value={item}>
								{MONTHS[item]}
							</option>
						))}
					</select>
				) : (
					<>
						<input
							style={styles.frequencyInput}
							disabled={disabled}
							className={css.frequencyInput}
							value={frequency}
							onChange={handleFrequencyChange}
							type="number"
							min={1}
						/>
						<label className={css.selectedRepeatlLabel} style={styles.selectedRepeatlLabel}>
							{repeat?.slice(0, -2)}(s)
						</label>
					</>
				)}
			</div>
		</div>
	);
}

export default Frequency;
