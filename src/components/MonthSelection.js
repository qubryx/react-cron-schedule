import React from 'react';
import css from './MonthSelection.module.css';
import {MONTH_DAY_TYPES, MONTH_OPTIONS, ORDERS, REPEAT_TYPES} from '../utils/constants';
import RepeatForDropdown from './RepeatForDropdown';
import { setRepeatCountAndTypeVal } from '../utils/utils';

const daysArr = [...Array(32).keys()].filter(x => x !== 0);
const OrderOptions = [ORDERS.FIRST, ORDERS.SECOND, ORDERS.THIRD, ORDERS.FOURTH, ORDERS.LAST];

function MonthSelection(props) {
	const {disabled = false, styles = {}, value = {}, setValue, state = {}, setState} = props;
	const {
		monthOption,
		selectedMonthDate,
		selectedMonthDay,
		selectedMonthDayOrder,
		repeatFor,
		isRepeatForDisabled,
		skipFrom,
		skipTo,
	} = state;

	const handleMonthOptionChange = event => {
		const val = event?.target?.value
		setState({ monthOption: val });
		setValue({
			isFullWeek: val === MONTH_OPTIONS.CUSTOM &&
				[MONTH_DAY_TYPES.FULL_WEEK, MONTH_DAY_TYPES.FULL_WORKING_WEEK].includes(selectedMonthDay)
		})
		setRepeatCountAndTypeVal(setValue, setState, isRepeatForDisabled, val, selectedMonthDate, selectedMonthDay, selectedMonthDayOrder, skipFrom, skipTo)
	};

	const handleMonthDateChange = event => {
		const val = Number(event?.target?.value)
		setState({ selectedMonthDate: val});
		setRepeatCountAndTypeVal(setValue, setState, isRepeatForDisabled, monthOption, val, selectedMonthDay, selectedMonthDayOrder, skipFrom, skipTo)
	};

	const handleMonthDayChange = event => {
		const val = event?.target?.value
		setState({ selectedMonthDay: val});
		setValue({isFullWeek: [MONTH_DAY_TYPES.FULL_WEEK, MONTH_DAY_TYPES.FULL_WORKING_WEEK].includes(val) })
		setRepeatCountAndTypeVal(setValue, setState, isRepeatForDisabled, monthOption, selectedMonthDate, val, selectedMonthDayOrder, skipFrom, skipTo)
	};

	const handleMonthDayOrderChange = event => {
		const val = event?.target?.value
		setState({ selectedMonthDayOrder: val });
		setRepeatCountAndTypeVal(setValue, setState, isRepeatForDisabled, monthOption, selectedMonthDate, selectedMonthDay, val, skipFrom, skipTo)
	};

	const monthDayTypeOptions = () => {
		let options = [
			{name: 'Day', value: MONTH_DAY_TYPES.DAY},
			{name: 'Weekday', value: MONTH_DAY_TYPES.WEEKDAY},
			{name: 'Full week', value: MONTH_DAY_TYPES.FULL_WEEK},
			{name: 'Full working week', value: MONTH_DAY_TYPES.FULL_WORKING_WEEK},
			{name: 'Multiple Days', value: MONTH_DAY_TYPES.SELECT_DAYS_MANUALLY},
		]
		return options;
	};

	return (
		<div className={css.mainContainer} style={styles.monthContainer}>
			<label className={css.onLabel} style={styles.onLabel}>
				On
			</label>

			<form className={css.container}>
				<div className={css.standardContainer}>
					<input
						disabled={disabled}
						value={MONTH_OPTIONS.STANDARD}
						name="monthOption"
						checked={monthOption === MONTH_OPTIONS.STANDARD}
						type="radio"
						onChange={handleMonthOptionChange}
					/>
					<select
						key="standardMonthOption"
						disabled={disabled || monthOption !== MONTH_OPTIONS.STANDARD}
						value={selectedMonthDate}
						className={css.dayDropdown}
						style={styles.dayDropdown}
						onChange={handleMonthDateChange}
					>
						{daysArr.map(item => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
					<label
						style={{...styles.dayLabel, color: `${monthOption !== MONTH_OPTIONS.STANDARD || disabled ? 'gray' : ''}`}}
						className={css.dayLabel}
					>
						day
					</label>
				</div>

				<label className={css.orLabel} style={styles.orLabel}>
					or
				</label>

				<div className={css.customContainer}>
					<input
						disabled={disabled}
						value={MONTH_OPTIONS.CUSTOM}
						name="monthOption"
						checked={monthOption === MONTH_OPTIONS.CUSTOM}
						type="radio"
						onChange={handleMonthOptionChange}
					/>
					<select
						key="orderSelection"
						disabled={disabled || monthOption !== MONTH_OPTIONS.CUSTOM}
						value={selectedMonthDayOrder}
						className={css.orderDropdown}
						style={styles.orderDropdown}
						onChange={handleMonthDayOrderChange}
					>
						{OrderOptions.map(item => {
							const optionDisable =
								(![ORDERS.FIRST, ORDERS.LAST].includes(item) && selectedMonthDay === MONTH_DAY_TYPES.WEEKDAY) ||
								(item === ORDERS.FOURTH && [MONTH_DAY_TYPES.FULL_WEEK, MONTH_DAY_TYPES.FULL_WORKING_WEEK].includes(selectedMonthDay))
							return (
								<option key={item} disabled={optionDisable} value={item}>
									{item}
								</option>
							);
						})}
					</select>
					{selectedMonthDayOrder === ORDERS.LAST &&
        				<RepeatForDropdown {...props} />
					}
					
					<select
						key="weekdaySelection"
						disabled={disabled || monthOption !== MONTH_OPTIONS.CUSTOM}
						value={selectedMonthDay}
						className={css.monthWeekdayDropdown}
						style={styles.monthWeekdayDropdown}
						onChange={handleMonthDayChange}
					>
						{monthDayTypeOptions().map(item => {
							const optionDisable =
								(item.value === MONTH_DAY_TYPES.WEEKDAY && ![ORDERS.FIRST, ORDERS.LAST].includes(selectedMonthDayOrder)) || 
								([MONTH_DAY_TYPES.FULL_WEEK, MONTH_DAY_TYPES.FULL_WORKING_WEEK].includes(item.value) && selectedMonthDayOrder === ORDERS.FOURTH)
							return (
								<option key={item.value} disabled={optionDisable} value={item.value}>
									{item.name}
								</option>
							);
						})}
					</select>
				</div>
			</form>
		</div>
	);
}

export default MonthSelection;
