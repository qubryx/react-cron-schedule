import React from 'react'
import RecurrenceComponent from './RecurrenceComponent';

export const Recurrence = (props) => {
  const [newProps, setNewProps] = React.useState(props);
  React.useEffect(()=>{
    const data = {...props}
    if(!data.value){
      data.value = {}
    }
    if(!data.styles){
      data.styles = {}
    }
    if(props?.showOnlyBottomBorder){
      const boxFields = [
        'repeatDropdown',
        'frequencyInput',
        'endType',
        'endCount',
        'dayDropdown',
        'orderDropdown',
        'monthWeekdayDropdown',
        'hourDropdown',
        'minuteDropdown',
        'monthDropdown',
        'lastCount',
        'repeatForCount',
        'repeatForType', 
        'additionalOptionWeekDropdown'
      ]
      boxFields.forEach(field => {
        data.styles[field] = {
          ...data.styles[field],
          border: data.styles[field]?.border || '0px',
          borderBottom: data.styles[field]?.borderBottom || '1px dotted',
          paddingBottom: data.styles[field]?.paddingBottom || 3
        }
      })
    }
    data.disabled = props.disabled || false,
    /*
    data.value.startDate = props.value.startDate || new Date()
    data.value.endDate = props.value.endDate || new Date()
    data.value.repeat = props.value.repeat || 'weekly'
    data.value.frequency = props.value.frequency || 1
    data.value.selectedEndType = props.value.selectedEndType || 'noend'
    data.value.endCount = props.value.endCount || 10
    data.value.cronExpression = props.value.cronExpression || ''
    */

    setNewProps(data)
  },[props?.disabled])
  return (
      <RecurrenceComponent {...newProps} />
  );
}

