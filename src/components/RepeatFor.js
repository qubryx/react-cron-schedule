import React, { useCallback } from 'react'
import css from './RepeatFor.module.css';
import RepeatForDropdown from './RepeatForDropdown';
import { MONTH_DAY_TYPES, MONTH_OPTIONS, ORDERS, REPEAT_TYPES } from '../utils/constants';

function RepeatFor(props) {
    const {disabled = false, styles = {}, state = {}, setState, setValue} = props;
	const {
        repeatForType,
        repeatFor,
        isRepeatForDisabled,
        monthOption,
        selectedMonthDay,
        selectedWeeks,
        selectedMonthDate,
        selectedMonthDayOrder,
    } = state;

    const handleRepeatForTypeChange = event => {
        const val = event?.target?.value
        const count = val === REPEAT_TYPES.WEEKS && repeatForType !== REPEAT_TYPES.WEEKS ? 2 : repeatFor
		setValue({ 
            repeatForType: val,
            repeatFor: count
        });
	};

    const handleRepeatForCheckbox = event => {
        let isDisabled = !isRepeatForDisabled 
		const rType = ( monthOption === MONTH_OPTIONS.STANDARD ||
            [MONTH_DAY_TYPES.DAY, MONTH_DAY_TYPES.WEEKDAY].includes(selectedMonthDay) ||
            (selectedMonthDay === MONTH_DAY_TYPES.SELECT_DAYS_MANUALLY && selectedWeeks?.length === 1 && selectedMonthDayOrder === ORDERS.FOURTH)
        ) ? REPEAT_TYPES.DAYS : REPEAT_TYPES.WEEKS

        setState({ isRepeatForDisabled: isDisabled })
        setValue({
            repeatFor: isDisabled ? undefined: 2,
            repeatForType: isDisabled ? undefined: rType
        })
    }

    const getRepeatForTypes = useCallback(() => {
        let arr = [
            {value: REPEAT_TYPES.DAYS, label: 'days'},
            {value: REPEAT_TYPES.WORKING_DAYS, label: 'working days'}
        ]
        if(monthOption === MONTH_OPTIONS.CUSTOM && ![MONTH_DAY_TYPES.DAY, MONTH_DAY_TYPES.WEEKDAY].includes(selectedMonthDay)){
            arr = [
                {value: REPEAT_TYPES.WEEKS, label: 'weeks'},
            ]
            if (selectedWeeks?.length === 1 && selectedMonthDay === MONTH_DAY_TYPES.SELECT_DAYS_MANUALLY){
                arr = [
                    {value: REPEAT_TYPES.DAYS, label: 'days'},
                    {value: REPEAT_TYPES.WORKING_DAYS, label: 'working days'},
                ]
                if([ORDERS.FIRST, ORDERS.SECOND, ORDERS.THIRD].includes(selectedMonthDayOrder)){
                    arr.push(
                        {value: REPEAT_TYPES.WEEKS, label: 'weeks'}
                    )
                }

            }
        }
        return arr
    },[monthOption, selectedMonthDay, selectedWeeks, selectedMonthDayOrder])

  return (
    <div className={css.repeatForContainer}>
        <input
            disabled={
                disabled ||
                (monthOption === MONTH_OPTIONS.STANDARD && Number(selectedMonthDate) > 27) ||
                (monthOption === MONTH_OPTIONS.CUSTOM && selectedMonthDayOrder === ORDERS.FOURTH && [MONTH_DAY_TYPES.FULL_WEEK, MONTH_DAY_TYPES.FULL_WORKING_WEEK].includes(selectedMonthDay))
            }
            value="isRepeatForDisabled"
            name="isRepeatForDisabled"
            checked={!isRepeatForDisabled}
            type="checkbox"
            onChange={handleRepeatForCheckbox}
        />
        <span 
		    style={{...styles.forLabel, color: `${isRepeatForDisabled || disabled ? 'gray' : ''}`}}
            className={css.forLabel}
        >
            For
        </span>
        <RepeatForDropdown {...props} disabled={disabled || isRepeatForDisabled} />
        <select
            key="repeatForType"
            disabled={disabled || isRepeatForDisabled}
            value={repeatForType}
            className={css.repeatForType}
            style={styles.repeatForType}
            onChange={handleRepeatForTypeChange}
        >
            {getRepeatForTypes().map(item => {
                return (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                );
			})}
        </select>
    </div>
  )
}

export default RepeatFor