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

const Template = (args) => <Recurrence {...args} />;

const commonArgs = {
    value: {
        frequency: 3,
        startDate: '2022-02-05',
        endDate: '2022-07-05',
        selectedEndType: 'date',
        endCount: 10,
        cronExpression: '',
    },
    disabled: false,
    showFrequency: true,
    showCronExpression: false,
    onChange: (val) => {console.log("==> change val: ", val)}, 
    styles: {
        root: { },
        frequencyContainer: {},
        repeatLabel: {},
        everyLabel: {},
        selectedRepeatlLabel: {}, // week(s) or month(s)
        repeatDropdown: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
        frequencyInput: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},

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
        dayDropdown: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
        orderDropdown: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
        monthWeekdayDropdown: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},

        dateContainer:{marginBottom: 30},
        startLabel: {},
        endLabel: {},
        startDate: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
        endDate: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
        endType: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
        endCount: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},

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