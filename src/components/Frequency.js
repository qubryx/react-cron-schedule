import React, { useContext } from 'react'
import css from './Frequency.module.css'
import { RecurrenceContext } from '../context/recurrence-context';
import { ACTION_TYPES } from '../context/actionTypes';

const repeatOptions = ['weekly', 'monthly']


function Frequency(props) {
  const styles = props?.styles || {}
  const {recurrenceData, dispatch} = useContext(RecurrenceContext);
  const {repeat, showFrequency, frequency, disabled} = recurrenceData

  const handleRepeatClick = (event) => {
    dispatch({type: ACTION_TYPES.SetRepeat, payload: event?.target?.value})
  }

  const handleFrequencyChange = (event) => {
    dispatch({type: ACTION_TYPES.SetFrequency, payload: event?.target?.value})
  }


  return (
    <div className={css.mainContainer} style={styles.frequencyContainer}>
      <div>
        <label className={css.repeatLabel} style={styles.repeatLabel} >Repeat</label>
        <select
          key='repeat'
          style={styles.repeatDropdown}
          disabled={disabled}
          value={repeat}
          className={css.repeatDropdown}
          name='repeat'
          id='repeat'
          onChange={handleRepeatClick}
        >
          {repeatOptions.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
      {showFrequency && (
        <div className={css.frequencyContainer}>
          <label className={css.everyLabel} style={styles.everyLabel} >Every</label>
          <input 
            style={styles.frequencyInput}
            disabled={disabled}
            className={css.frequencyInput}
            value={frequency}
            onChange={handleFrequencyChange}
            type='number'
            min={1}
          />
          <label className={css.selectedRepeatlLabel} style={styles.selectedRepeatlLabel}>{repeat?.slice(0,-2)}(s)</label>
        </div> 
      )}
    </div>
  )
}


export default Frequency