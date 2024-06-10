const parser = require('cron-schedule-parser')

export function getEndDateFromCount(
	cronExpression,
	endCount,
	frequency = 1,
	frequencyType = REPEAT_OPTIONS.WEEKLY,
	startDate = new Date(),
	repeatFor = undefined,
	repeatForType = undefined,
	skipFrom = undefined,
	skipTo = undefined,
	isFullWeek = false,
) {
	try {
		const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
		startDate = startDate ? new Date(startDate) : startDate
		const interval = parser.parseCronExpressions(cronExpression, {
            frequency: frequency,
            frequencyType: frequencyType,
            currentDate: startDate,
            tz: timeZone,
			repeatFor: repeatFor,
			repeatType: repeatForType,
			skipFrom: skipFrom,
			skipTo: skipTo,
			isFullWeek: isFullWeek
        });
		let occurrence;
		for (let i = 0; i < endCount; i++) {
			occurrence = interval.next();
		}
		return occurrence.toString()

	} catch (err) {
		console.log("Error finding end date: ", err)
		return undefined
	}

}