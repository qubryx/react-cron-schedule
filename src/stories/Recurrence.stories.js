import { Recurrence } from '../components/Recurrence';

export default {
    title: 'Recurrence - Schedule',
    compoenent: 'Recurrence',
    argTypes: {
        repeat: {
            options: ['weekly', 'monthly'],
            control: {type: 'radio'}
        },
        selectedEndType: {
            options: ['noend', 'date', 'count'],
            control: {type: 'radio'}
        }
    }
};

/*
    CASE1:
        // Standard
        value {
            cronExpression: ['0 0 20 * ?'],
            repeatFor: 4,
            repeatForType: 'workingDays'
        }
    CASE2:
        // Custom => Day
        value {
            cronExpression: ['0 0 1 * ?'],
            repeatFor: 4,
            repeatForType: 'days'
        }
        value {
            cronExpression: ['0 0 L * ?'],
            repeatFor: 1,
            repeatForType: 'days'
        }
    CASE3:
        // Custom => Weekday
        value {
            cronExpression: ['0 0 1W * ?'],
            repeatFor: 4,
            repeatForType: 'days' 
        }
        value {
            cronExpression: ['0 0 1W * ?'],
            repeatFor: 4,
            repeatForType: 'workingDays' 
        }
        value {
            cronExpression: ['0 0 LW * ?'],
            repeatFor: 4,
            repeatForType: 'workingDays' 
        }
    CASE4
        // Custom => Full week
        value {
            cronExpression: ['0 0 ? * 0#2'],
            repeatFor: 3,
            repeatForType: 'weeks',
            isFullWeek: true
        }
        // Custom => Last full week
        value {
            cronExpression: ['0 0 ? * 6L'],
            repeatFor: 3,
            repeatForType: 'weeks',
            isFullWeek: true
        }
        // Custom => Last full working week
        value {
            cronExpression: ['0 0 ? * 5L'],
            repeatFor: 3,
            repeatForType: 'weeks',
            isFullWeek: true
        }
        // Custom => Full working week
        value {
            cronExpression: ['0 0 ? * 1#2'],
            repeatFor: 3,
            repeatForType: 'weeks',
            isFullWeek: true
        }
    CASE 5
        // Custom => Manual day selection
        value {
            cronExpression: ["5 10 ? * 1#2", "5 10 ? * 3#2", "5 10 ? * 5#2"],
            repeatFor: 3,
            repeatForType: 'weeks',
        }
        // Custom => Last manual day selection
        value {
            cronExpression: ["5 10 ? * 1L", "5 10 ? * 3L", "5 10 ? * 5L"],
            repeatFor: 1,
            repeatForType: 'weeks',
        }
*/

const Template = (args) => <Recurrence {...args} />;

const commonArgs = {
    value: {
        frequency: 3,
        // startDate: '2022-02-05',
        // endDate: '2022-07-05',
        selectedEndType: 'noend',
        endCount: 10,
        cronExpression: '0 0 25 * ?',
        repeat: 'yearly',

        cronExpression: ["5 10 10 6,7 ?"],
        repeatFor: 3,
        repeatForType: 'days',
        skipFrom: 3,
        skipTo: 2
    },
    disabled: false,
    showCronExpression: false,
    showOnlyBottomBorder: true,
    onChange: (val) => {console.log("===> onChange: ", val)}, 
    styles: {
        root: { },
        frequencyContainer: {},
        repeatLabel: {},
        everyLabel: {},
        selectedRepeatlLabel: {}, // week(s) or month(s)
        // repeatDropdown: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
        // frequencyInput: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},

        weekContainer:{marginBottom: 20, marginTop: 15},
        weekdayBtnContainer: {},
        weekdayBtn: {},
        selectedWeekdayBtn: {backgroundColor: 'green'},
        weekdayFullTextLabel: {}, // in mobile view only
        selectedWeekdayFullTextLabel: {}, // in mobile view only

        monthContainer:{marginBottom: 30, marginTop: 30},
        onLabel: {},
        dayLabel: {},
        orLabel: {},
        // dayDropdown: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
        // orderDropdown: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
        // monthWeekdayDropdown: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},

        dateContainer:{marginBottom: 30},
        startLabel: {},
        endLabel: {},
        // startDate: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
        // endDate: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
        // endType: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
        // endCount: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},

        cronExpression: {},
        recurrenceText: {color: 'orange'},
    }
}

export const Weekly = Template.bind({});
Weekly.args = {
    repeat: 'weekly',
    ...commonArgs,
}

export const Monthly = Template.bind({});
Monthly.args = {
    repeat: 'monthly',
    ...commonArgs,
}