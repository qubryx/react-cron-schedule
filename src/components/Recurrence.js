import React from 'react'
import RecurrenceComponent from './RecurrenceComponent';
import RecurrenceProvider from "../context/recurrence-context";

export const Recurrence = (props) => {
  const [newProps, setNewProps] = React.useState(props);
  React.useEffect(()=>{
    const data = {...props}
    if(!data.styles){
      data.styles = {}
    }
    if(props?.showOnlyBottomBorder){
      const boxFields = ['repeatDropdown', 'frequencyInput', 'startDate', 'endDate', 'endType', 'endCount', 'dayDropdown', 'orderDropdown', 'monthWeekdayDropdown']
      boxFields.forEach(field => {
        data.styles[field] = {
          ...data.styles[field],
          border: data.styles[field]?.border || '0px',
          borderBottom: data.styles[field]?.borderBottom || '1px solid',
          paddingBottom: data.styles[field]?.paddingBottom || 3
        }
      })
      setNewProps(data)
    }
  },[props])
  return (
    <RecurrenceProvider>
      <RecurrenceComponent {...newProps} />
    </RecurrenceProvider>
  );
}

