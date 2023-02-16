import { getFormattedCurrentDate, getFormattedDate } from "../utils/commonFns"
import { ACTION_TYPES } from "./actionTypes"

export const reducer = (state, action) => {
    switch (action.type){
        case ACTION_TYPES.SetRepeat: 
            return {
                ...state,
                repeat: action.payload
            }
        case ACTION_TYPES.SetFrequency: 
            return {
                ...state,
                frequency: Number(action.payload)
            }
        case ACTION_TYPES.SetMonthOption: 
            return {
                ...state,
                monthOption: action.payload
            }
        case ACTION_TYPES.SetSelectedWeeks:
            return {
                ...state,
                selectedWeeks: action.payload || []
            }
        case ACTION_TYPES.SetMonthDate:
            return {
                ...state,
                selectedMonthDate: Number(action.payload)
            }
        case ACTION_TYPES.SetMonthDay:
            return {
                ...state,
                selectedMonthDay: action.payload
            }
        case ACTION_TYPES.SetMonthDayOrder:
            return {
                ...state,
                selectedMonthDayOrder: action.payload
            }
        case ACTION_TYPES.SetStartDate:
            return {
                ...state,
                startDate: action.payload
            }
        case ACTION_TYPES.SetEndType:
            return {
                ...state,
                selectedEndType: action.payload
            }
        case ACTION_TYPES.SetEndDate:
            return {
                ...state,
                endDate: action.payload
            }
        case ACTION_TYPES.SetEndCount:
            return {
                ...state,
                endCount: Number(action.payload)
            }
        case ACTION_TYPES.SetInitialProps:
            return {
                ...state,
                repeat: action.payload?.repeat || 'weekly',
                disabled: action.payload?.disabled,
                showFrequency: action.payload?.showFrequency,
                frequency: action.payload?.frequency || 1,
                startDate: action.payload?.startDate ? getFormattedDate(action.payload?.startDate) : getFormattedCurrentDate(),
                endDate: action.payload?.endDate ? getFormattedDate(action.payload?.endDate) : getFormattedCurrentDate(),
                selectedEndType: action.payload?.selectedEndType || 'noend',
                endCount: action.payload?.endCount || 10,
                selectedWeeks: action.payload?.selectedWeeks || [new Date().getDay()],
                monthOption: action.payload?.monthOption || 'standard',
                selectedMonthDate: action.payload?.selectedMonthDate || new Date().getDate(),
                selectedMonthDayOrder: action.payload?.selectedMonthDayOrder || 'First',
                selectedMonthDay: action.payload?.selectedMonthDay || 'Day',
            }
        case ACTION_TYPES.SetCronExp:
            return {
                ...state,
                cronExpression: action.payload
            }
        default:
            return state
    }
}