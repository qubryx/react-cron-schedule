# React Cron Schedule 
A simple and lightweight library for scheduling recurring events in React.

## Getting Started
```shell
npm install react-cron-schedule
```

or 

if you are installing from github package registry
```shell
npm install @qubryx/react-cron-schedule
```

If the library is not working as expected (Only for the user installed by github package registry), you may need to add the following line to your `.npmrc` file.
```npmrc
  @qubryx:registry=https://npm.pkg.github.com/qubryx
```

## Demo
[Live Demo](https://fahimkk.github.io/react-recurring-job-demo/)

![Image](https://github.com/qubryx/react-cron-schedule/blob/main/src/assets/weekly.png)
![Image](https://github.com/qubryx/react-cron-schedule/blob/main/src/assets/monthly.png)

## Usage

```javascript
import { Recurrence } from 'react-cron-schedule';

function App() {
  return (
    <Recurrence
      onChange={(value) => console.log(value) }
    />
  );
}


export default App;
```

## Props

| Names  | Type           | Default | Description | Mandatory |
| ------ | -------------- |---------|-------------| --------- |
| value| object |  |Fileds in onChange function prop, can use to edit or set default values | No |
| disabled | boolean | false | Disable all fields | No |
| showCronExpression | boolean | false | Show cron expression of recurring event at the bottom | No |
| onChange | function |  | Have single object argument, which contains user selected settings  | No |
| styles | object |  | React style object  | No |

### value props

value prop can be used to pass default values 

| Names  | Type           | Default | Description | Mandatory |
| ------ | -------------- |---------|-------------| --------- |
| startDate| Date/String | new Date()|The starting date of the recurring event| No |
| endDate| Date/String | null |The ending date of the recurring event | No |
| repeat| String | 'weekly' |The repeating of the reoccurring event. Possible values: __"weekly"__, __"monthly"__. | No |
| frequency| Number | 1 | The interval between each recurrence. | No |
| selectedEndType | String | 'noend' | The end type of the recurring event. Possible values: __"noend"__, __"date"__, __"count"__ | No |
| endCount | Number | 10 | The end count of the recurring event | No |
| cronExpression | Array of Strings | [] | Cron Expression of the recurring event to set the fied values for editing  | No |
| showOnlyBottomBorder | Boolean | false | Show only bottom border for all the box components  | No |
| repeatFor | Number | undefined | The number of occurance after the interval  | No |
| repeatForType | String | 'days'  | The type of occurance after the interval, possible values: __"days"__, __"workingDays"__, __"weeks"__  | No |
| isFullWeek | Boolean | false | To occure an event on the full week  | No |
| skipFrom | Number | null | If the event falls on any of these days (0–6 for Sunday to Saturday), it will be skipped and rescheduled to the day specified in skipTo  | No |
| skipTo | Number | null | The day (0–6 for Sunday to Saturday) to which the event should be moved if it matches any day listed in skipFrom  | No |

<br/><br/>

```javascript
import { Recurrence } from 'react-cron-schedule';

function App() {
  return (
    <Recurrence
      value = {
        startDate: {new Date()},
        endDate: {new Date(2030, 11, 31)},
        repeat:"weekly"
      }
    />
  );
}


export default App;
```

## CSS 

| Rule name  | Description | 
| ------ | -------------- |
| root | styles applied to root element |
| frequencyContainer | styles applied to components in frequency row  |
| repeatLabel | styles applied to __'Repeat'__ text |
| repeatDropdown | styles applied to repeat selection dropdown  |
| selectedRepeatLabel | styles applied to selected repeat label. Eg: __'week(s)'__ |
| frequencyInput | styles applied to frequency number input  |
| weekContainer | styles applied to components in week selection row  |
| weekdayBtnContainer | styles applied to weekday button container  |
| weekdayBtn | styles applied to weekday button  |
| selectedWeekdayBtn | styles applied to selected weekday button  |
| weekdayFullTextLabel | styles applied to weekday full text in mobile view checkbox |
| selectedWeekdayFullTextLabel | styles applied to selected weekday full text in mobile view checkbox |
| monthContainer | styles applied to components in month selection row  |
| onLabel | styles applied to __'On'__ text  |
| dayLabel | styles applied to __'day'__ text  |
| orLabel | styles applied to __'or'__ text  |
| dayDropdown | styles applied to day selection dropdown in month. Eg: 1 - 31 |
| orderDropdown | styles applied to order selection dropdown in month: 'First', 'Second', etc |
| monthWeekdayDropdown | styles applied to weekday selection dropdown in month: 'Monday', 'Day', etc |
| dateContainer | styles applied to components in date selection row  |
| startLabel | styles applied to __'Start'__ text  |
| endLabel | styles applied to __'End'__ text  |
| startDate | styles applied to start date picker |
| endDate | styles applied to end date picker |
| endType | styles applied to end type selection dropdown. Eg: 'date', 'count', etc |
| endCount | styles applied to end count number input |
| recurrenceText | styles applied to recurrenct text  |
| cronExpression | styles applied to cronExpression text  |

<br/><br/>

```javascript

import { Recurrence } from 'react-cron-schedule';

function App() {
  return (
    <Recurrence
      repeat="weekly"
      styles= {
        repeatDropdown: {
          border: '0px',
          borderBottom: '1px solid',
          paddingBottom: 3
        },
        frequencyInput: {
          border: '0px',
          borderBottom: '1px solid',
          paddingBottom: 3
        },
        weekContainer:{
          marginBottom: 20,
          marginTop: 15
        },
        selectedWeekdayBtn: {
          backgroundColor: 'green'
        },
        dateContainer:{
          marginBottom: 30
        },
        startDate: {
          border: '0px',
          borderBottom: '1px solid',
          paddingBottom: 3
        },
        endDate: {
          border: '0px',
          borderBottom: '1px solid',
          paddingBottom: 3
        },
        endType: {
          border: '0px',
          borderBottom: '1px solid',
          paddingBottom: 3
        },
        recurrenceText: {
          color: 'orange'
        },
      }
    />
  );
}

export default App;

```

![Image](https://github.com/qubryx/react-cron-schedule/blob/main/src/assets/weeklyStyled.png)


## License
React Recurring Job is open-sourced library licensed under the Apache license.




