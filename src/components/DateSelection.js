import React, { useContext } from 'react'
import { ACTION_TYPES } from '../context/actionTypes';
import { RecurrenceContext } from '../context/recurrence-context';
import css from './DateSelection.module.css';

function DateSelection(props) {
  	const styles = props?.styles || {}
    const {recurrenceData, dispatch} = useContext(RecurrenceContext);
    const {selectedEndType, startDate, endDate, endCount, disabled} = recurrenceData

    const handleEndTypeChange = (event) => {
        dispatch({type: ACTION_TYPES.SetEndType, payload: event?.target?.value})
    }
    const handleStartDateChange = (event) => {
        dispatch({type: ACTION_TYPES.SetStartDate, payload: event?.target?.value})
    }
    const handleEndDateChange = (event) => {
        dispatch({type: ACTION_TYPES.SetEndDate, payload: event?.target?.value})
    }
    const handleEndCountChange = (event) => {
        dispatch({type: ACTION_TYPES.SetEndCount, payload: event?.target?.value})
    }

    return (
        <div className={css.mainContainer} style={styles.dateContainer}>
            <div className={css.startContainer}>
                <label style={styles.startLabel}>Start</label>
                <input
                    disabled={disabled}
                    value={startDate}
                    onChange={handleStartDateChange}
                    className={css.startDate}
                    style={styles.startDate}
                    type="date"
                    id="start"
                    name="start"
                />
            </div>
            <div className={css.endContainer}>
                <label style={styles.endLabel}>End</label>
                <select 
                    key='endType'
                    disabled={disabled}
                    value={selectedEndType}
                    className={css.endType}
                    style={styles.endType}
                    onChange={handleEndTypeChange}
                >
                    <option key={'noend'} value='noend'>no end date</option>
                    <option key={'date'} value='date'>on this day</option>
                    <option key={'count'} value='count'>after</option>
                </select>
                {selectedEndType === 'date' ? 
                    <input 
                        disabled={disabled}
                        value={endDate}
                        onChange={handleEndDateChange}
                        className={css.endDate}
                        style={styles.endDate}
                        type="date"
                        id="end"
                        name="end"
                    />
                :(selectedEndType === 'count' ? 
                    <>
                        <input 
                            disabled={disabled}
                            value={endCount}
                            onChange={handleEndCountChange}
                            className={css.endCount}
                            style={styles.endCount}
                            type='number'
                            min={1}
                        />
                        <label style={{marginLeft: 10}}>occurance</label>
                    </>
                    :null
                )}
            </div>
        </div>
    )
}

export default DateSelection