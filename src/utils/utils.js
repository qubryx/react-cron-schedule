import { MONTH_DAY_TYPES, MONTH_OPTIONS, ORDERS, REPEAT_OPTIONS, REPEAT_TYPES } from "./constants"

export const setRepeatCountAndTypeVal = (
    setValue,
    setState,
    isRepeatForDisabled,
    monthOption,
    selectedMonthDate,
    selectedMonthDay,
    selectedMonthDayOrder,
    skipFrom,
    skipTo 
) => {
    let repeatFor = undefined
    let repeatForType = undefined
    if (monthOption === MONTH_OPTIONS.STANDARD) {
        let disabled = isRepeatForDisabled
        if (Number(selectedMonthDate) > 27) {
            disabled = true
            setState({isRepeatForDisabled: true})
        }
        repeatFor = disabled ? undefined : 2
        repeatForType = disabled ? undefined : REPEAT_TYPES.DAYS
    } else if(monthOption === MONTH_OPTIONS.CUSTOM){
        if(selectedMonthDayOrder === ORDERS.LAST){
            const rType = selectedMonthDay === MONTH_DAY_TYPES.DAY ? REPEAT_TYPES.DAYS 
                            : selectedMonthDay === MONTH_DAY_TYPES.WEEKDAY ? REPEAT_TYPES.WORKING_DAYS
                            : REPEAT_TYPES.WEEKS
            repeatFor = 1
            repeatForType = rType
        } else {
		    const rType = [MONTH_DAY_TYPES.DAY, MONTH_DAY_TYPES.WEEKDAY].includes(selectedMonthDay) ?
                            REPEAT_TYPES.DAYS : REPEAT_TYPES.WEEKS
            const disabled = isRepeatForDisabled ||
                            (selectedMonthDayOrder === ORDERS.FOURTH && rType === REPEAT_TYPES.WEEKS)
            repeatFor = disabled ? undefined : 2
            repeatForType = disabled ? undefined : rType
            if(disabled){
                setState({isRepeatForDisabled: true})
            }
        }
    }

    setValue ({ repeatFor, repeatForType })

    if(
        skipFrom !== undefined &&
        skipTo !== undefined &&
        monthOption === MONTH_DAY_TYPES.CUSTOM &&
        (
            [MONTH_DAY_TYPES.FULL_WEEK, MONTH_DAY_TYPES.FULL_WORKING_WEEK, MONTH_DAY_TYPES.SELECT_DAYS_MANUALLY].includes(selectedMonthDay) ||
            selectedMonthDayOrder === ORDERS.LAST
        )
    ){
        setValue ({ skipFrom: undefined, skipTo: undefined })
        setState({ isAdditionalOptionsActive: false })
    }
}

export const getFrequencyType = (repeat, frequency) => {
    if (repeat === REPEAT_OPTIONS.WEEKLY){
        if (frequency === 2) return REPEAT_OPTIONS.BI_WEEKLY
    } else if (repeat === REPEAT_OPTIONS.MONTHLY) {
        if (frequency === 2) return REPEAT_OPTIONS.BI_MONTHLY
        else if (frequency === 3) return REPEAT_OPTIONS.QUARTERLY
        else if (frequency === 6) return REPEAT_OPTIONS.SEMI_ANNUAL
    }
    return repeat
}

export const getRepeatFromFreqType = (freqType) => {
    if ([REPEAT_OPTIONS.BI_WEEKLY].includes(freqType)) return REPEAT_OPTIONS.WEEKLY
    else if ([REPEAT_OPTIONS.BI_MONTHLY, REPEAT_OPTIONS.QUARTERLY, REPEAT_OPTIONS.SEMI_ANNUAL].includes(freqType)) return REPEAT_OPTIONS.MONTHLY
    return freqType
}