import { DAYS_IN_MONTH, MONTHS, WEEKDAYS_MAP } from "./constants";

// date str format: YYYY-MM-DD
export const getWeekday = (date) => {
    const dateObj = new Date(date)
    const weekDay = WEEKDAYS_MAP.find(item => item.value === dateObj?.getDay())?.name
    return weekDay
}
export const getMonthName = (date) => {
    const dateObj = new Date(date)
    const month = MONTHS[dateObj.getMonth()]
    return month
}
export const getDateWithZero = (dateInput) =>  {
    const dateObj = new Date(dateInput)
    const date = dateObj.getDate()  
    if (date > 9) return date
    return `0${date}`
}

export const getDaysInMonth = (monthArr = []) => {
    const maxDayInMonth = monthArr.reduce((maxDays, month) => Math.max(maxDays, DAYS_IN_MONTH[month]), 0);
	return maxDayInMonth
}