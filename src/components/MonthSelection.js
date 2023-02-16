import React, {useContext} from 'react'
import css from './MonthSelection.module.css';
import { WEEKDAYS_MAP } from '../utils/weekConstants';
import { RecurrenceContext } from '../context/recurrence-context';
import { ACTION_TYPES } from '../context/actionTypes';

const daysArr = [...Array(32).keys()].filter(x => x !== 0);
const OrderOptions = ['First', 'Second', 'Third','Fourth', 'Last']

function MonthSelection(props) {
  	const styles = props?.styles || {}
    const {recurrenceData, dispatch} = useContext(RecurrenceContext);
    const {
        monthOption,
        selectedMonthDate,
        selectedMonthDayOrder,
        selectedMonthDay,
        disabled
    } = recurrenceData

    const handleMonthOptionChange = (event) => {
        dispatch({type: ACTION_TYPES.SetMonthOption, payload: event?.target?.value})
    }
    const handleMonthDateChange = (event) => {
        dispatch({type: ACTION_TYPES.SetMonthDate, payload: event?.target?.value})
    }
    const handleMonthDayChange = (event) => {
        dispatch({type: ACTION_TYPES.SetMonthDay, payload: event?.target?.value})
    }
    const handleMonthDayOrderChange = (event) => {
        dispatch({type: ACTION_TYPES.SetMonthDayOrder, payload: event?.target?.value})
    }

    const weekDaysOptions = () => {
		let options = [...WEEKDAYS_MAP];
		options = options.concat([
			{name: 'Day', value: 'Day'},
			{name: 'Weekday', value: 'Weekday'}
		]);
		return options;
	};


    return (
        <div className={css.mainContainer} style={styles.monthContainer}>
            <label className={css.onLabel} style={styles.onLabel}>On</label>

            <div className={css.container}>
                <div className={css.standardContainer}>
                    <input 
                        disabled={disabled}
                        value='standard'
                        name='monthOption'
                        checked={monthOption === 'standard'}
                        type="radio"
                        onChange={handleMonthOptionChange}
                    />
                    <select 
                        key='standardMonthOption'
                        disabled={disabled || monthOption !== 'standard'}
                        value={selectedMonthDate}
                        className={css.dayDropdown}
                        style={styles.dayDropdown}
                        onChange={handleMonthDateChange}
                    >
                        {daysArr.map(item => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                    <label 
                        style={{...styles.dayLabel, color: `${monthOption !== 'standard' || disabled ? 'gray': ''}`}}
                        className={css.dayLabel}
                    >
                        day
                    </label>
                </div>

                <label className={css.orLabel} style={styles.orLabel}>or</label>

                <div className={css.customContainer}>
                    <input
                        disabled={disabled}
                        value='custom'
                        name='monthOption'
                        checked={monthOption === 'custom'}
                        type="radio"
                        onChange={handleMonthOptionChange}
                    />
                    <select 
                        key='orderSelection'
                        disabled={disabled || monthOption !== 'custom'}
                        value={selectedMonthDayOrder}
                        className={css.orderDropdown}
                        style={styles.orderDropdown}
                        onChange={handleMonthDayOrderChange}
                    >
                        {OrderOptions.map(item => {
                            const optionDisable = !['First', 'Last'].includes(item) && selectedMonthDay === 'Weekday'
                            return <option key={item} disabled={optionDisable} value={item}>{item}</option>
                        })}
                    </select>
                    <select 
                        key='weekdaySelection'
                        disabled={disabled || monthOption !== 'custom'}
                        value={selectedMonthDay}
                        className={css.monthWeekdayDropdown}
                        style={styles.monthWeekdayDropdown}
                        onChange={handleMonthDayChange}
                    >
                        {weekDaysOptions().map(item => {
                            const optionDisable = item.name === 'Weekday' && !['First', 'Last'].includes(selectedMonthDayOrder)
                            return <option key={item.name} disabled={optionDisable} value={item.name}>{item.name}</option>
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}


export default MonthSelection