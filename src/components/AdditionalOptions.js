import React from 'react'

import css from './AdditionalOptions.module.css';
import { WEEKDAYS_MAP } from '../utils/constants'

function AdditionalOptions(props) {
	const {disabled = false, styles = {}, state = {}, setState, setValue} = props;
    const {isAdditionalOptionsActive, skipFrom, skipTo} = state

    const handleAdditionalOptionCheckbox = event => {
        setState({isAdditionalOptionsActive: !isAdditionalOptionsActive})
        setValue({
            skipFrom: !isAdditionalOptionsActive ? 5: undefined,
            skipTo: !isAdditionalOptionsActive ? 1: undefined
        })
    }

    const handleSkipFromChange = event => {
        setState({skipFrom: event?.target?.value})
    }

    const handleSkipToChange = event => {
        setState({skipTo: event?.target?.value})
    }

    return (
        <div>
            <div>
                Additional Options
            </div>
            <div className={css.additionalOptionContainer} style={styles.additionalOptionContainer}>
                <input
                    disabled={disabled}
                    value="isAdditionalOptionsActive"
                    name="isAdditionalOptionsActive"
                    checked={isAdditionalOptionsActive}
                    type="checkbox"
                    onChange={handleAdditionalOptionCheckbox}
                />
                <label 
                    className={css.additionalOptionText}
		            style={{...styles.additionalOptionText, color: `${!isAdditionalOptionsActive || disabled ? 'gray' : ''}`}}
                >
                    If task (or first instance of a task sequence) is on a
                </label>
                <select
                    key="skipFrom"
                    disabled={disabled || !isAdditionalOptionsActive}
                    value={skipFrom || 5}
                    className={css.additionalOptionWeekDropdown}
                    style={styles.additionalOptionWeekDropdown}
                    onChange={handleSkipFromChange}
                >
                    {WEEKDAYS_MAP.map(item => (
                        <option key={item.name} value={item.value}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <label 
                    className={css.additionalOptionText}
		            style={{...styles.additionalOptionText, color: `${!isAdditionalOptionsActive || disabled ? 'gray' : ''}`}}
                >
                    push to next
                </label>
                <select
                    key="skipTo"
                    disabled={disabled || !isAdditionalOptionsActive}
                    value={skipTo || 1}
                    className={css.additionalOptionWeekDropdown}
                    style={styles.additionalOptionWeekDropdown}
                    onChange={handleSkipToChange}
                >
                    {WEEKDAYS_MAP.map(item => (
                        <option key={item.name} value={item.value}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
  )
}

export default AdditionalOptions