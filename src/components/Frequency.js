import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import css from './Frequency.module.css';
import {END_TYPES, MONTHS, MONTH_OPTIONS, REPEAT_OPTIONS} from '../utils/constants';
import { getDaysInMonth } from '../utils/dateUtils';

const repeatOptions = [REPEAT_OPTIONS.WEEKLY, REPEAT_OPTIONS.MONTHLY, REPEAT_OPTIONS.YEARLY];

function Frequency(props) {
	const {disabled = false, styles = {}, setValue, state = {}, setState} = props;
	const {months, repeat, frequency, isFullWeek, selectedMonthDate, monthOption} = state;
  const [monthOptions, setMonthOptions] = useState([])
  const [selectedMonths, setSelectedMonths] = useState([])

  useEffect(()=>{
    const selMonths = months.map(m => {
      return {value: m, label: MONTHS[m]}
    })
    setSelectedMonths(selMonths);
    const options = MONTHS.map((m, index) => {
      return {value: index, label: m}
    })
    setMonthOptions(options)
  },[months])



	const handleRepeatClick = event => {
    	const val = event?.target?.value
		setValue({
			repeat: val,
			frequency: val === REPEAT_OPTIONS.YEARLY ? 1 : Number(frequency),
			repeatFor: undefined, 
			repeatForType: undefined,
			isRepeatForDisabled: true, 
			skipFrom: undefined,
			skipTo: undefined,
			isFullWeek: val === REPEAT_OPTIONS.WEEKLY ? false : isFullWeek,
			isAdditionalOptionsActive: false,
			selectedEndType: END_TYPES.NO_END,
		});
		if (val === REPEAT_OPTIONS.YEARLY && monthOption === MONTH_OPTIONS.STANDARD) {
			const maxDayInMonth = getDaysInMonth(months)
			if(selectedMonthDate > maxDayInMonth) {
				setState({ selectedMonthDate: maxDayInMonth })
			}
		}
	};

	const handleFrequencyChange = event => {
		setValue({frequency: Number(event?.target?.value)});
	};

	const handleMonthChange = event => {
    if(event?.length === 0) return
		const val = event?.map(m => Number(m?.value))
		setValue({months: val});
		if (repeat === REPEAT_OPTIONS.YEARLY && monthOption === MONTH_OPTIONS.STANDARD) {
			const maxDayInMonth = getDaysInMonth(val)
			if(selectedMonthDate > maxDayInMonth) {
				setState({ selectedMonthDate: maxDayInMonth })
			}
		}
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
			<div className={css.frequencyContainer} style={styles.frequencyContainer}>
				<label className={css.everyLabel} style={styles.everyLabel}>
					Every
				</label>
				{repeat === REPEAT_OPTIONS.YEARLY ? (
          <Select
		  	isDisabled={disabled}
            value={selectedMonths}
            onChange={handleMonthChange}
            isMulti
            name="months"
            options={monthOptions}
            required
            closeMenuOnSelect={false}
            isClearable={false}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                maxWidth: 300,
                border: 'none',
                borderBottom: '1px dotted',
                borderRadius: 0,
                marginTop: -10
              }),
            }}
          />
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
