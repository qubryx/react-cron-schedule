import React, { useCallback } from 'react'
import css from './RepeatForDropdown.module.css';
import { getOrderNum } from '../utils/cronExpression';
import { MONTH_DAY_TYPES, MONTH_OPTIONS, ORDERS, REPEAT_TYPES } from '../utils/constants';

function RepeatForDropdown(props) {
    const {disabled = false, styles = {}, state = {}, setValue} = props;
	const {repeatFor,repeatForType, monthOption, selectedMonthDate, selectedMonthDay, selectedMonthDayOrder, selectedWeeks} = state;

    const getRepeatForCounts = useCallback(() => {
        const totalDays = 30
        let subDays = Number(selectedMonthDate)
        const orderNum = getOrderNum(selectedMonthDayOrder)
        if(monthOption === MONTH_OPTIONS.CUSTOM && [MONTH_DAY_TYPES.DAY, MONTH_DAY_TYPES.WEEKDAY].includes(selectedMonthDay)){
            subDays =  selectedMonthDayOrder === ORDERS.LAST ? 1 : orderNum
        }
        let daysNum = totalDays > subDays ? totalDays - subDays : 1
        const skipNums = [0]
        if (!(state.selectedMonthDayOrder === ORDERS.LAST && state.monthOption === MONTH_OPTIONS.CUSTOM)){
            skipNums.push(1)
        }
        let arr = [...Array(daysNum).keys()]
        if (monthOption === MONTH_OPTIONS.CUSTOM) {
            if(selectedMonthDay === MONTH_DAY_TYPES.SELECT_DAYS_MANUALLY){
                if (selectedMonthDayOrder === ORDERS.LAST) {
                    arr = selectedWeeks?.length > 1 ? [1] : [1,2,3,4]
                } else {
                    const totalDaysNum = repeatForType === REPEAT_TYPES.WORKING_DAYS ? 22 : totalDays
                    const sub = repeatForType === REPEAT_TYPES.WORKING_DAYS ? (5*(orderNum-1)) : (7*(orderNum-1))
                    arr = repeatForType === REPEAT_TYPES.WEEKS ? [...Array(6 - orderNum).keys()] 
                        : [...Array(totalDaysNum-sub).keys()]
                }
            } else if([MONTH_DAY_TYPES.FULL_WEEK, MONTH_DAY_TYPES.FULL_WORKING_WEEK].includes(selectedMonthDay)){
                daysNum =  selectedMonthDayOrder === ORDERS.LAST ? 4 : 5 - orderNum
                arr = [...Array(daysNum + 1).keys()]
            }
        }
        return arr.filter(x => !skipNums.includes(x))
    },[monthOption, selectedMonthDay, selectedMonthDate, selectedMonthDayOrder, selectedWeeks, repeatForType])

    const handleRepeatForChange = event => {
        const val = Number(event?.target?.value)
		setValue({repeatFor: val });
	};

    return (
        <select
            key="repeatFor"
            disabled={disabled}
            value={repeatFor}
            className={css.repeatForCount}
            style={styles.repeatForCount}
            onChange={handleRepeatForChange}
        >
            {getRepeatForCounts().map(item => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    )
}

export default RepeatForDropdown