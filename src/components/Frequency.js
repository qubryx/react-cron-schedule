import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import css from './Frequency.module.css';
import {MONTHS, REPEAT_OPTIONS} from '../utils/constants';

const repeatOptions = [REPEAT_OPTIONS.WEEKLY, REPEAT_OPTIONS.MONTHLY, REPEAT_OPTIONS.YEARLY];

function Frequency(props) {
	const {disabled = false, styles = {}, setValue, state = {}, setState} = props;
	const {months, repeat, frequency} = state;
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
      isAdditionalOptionsActive: false
    });
	};

	const handleFrequencyChange = event => {
		setValue({frequency: Number(event?.target?.value)});
	};

	const handleMonthChange = event => {
    if(event?.length === 0) return
		setValue({months: event?.map(m => Number(m?.value))});
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
