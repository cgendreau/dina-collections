const buildDateRange = require('./buildDateRange')
const getTimestampFromYMD = require('./getTimestampFromYMD')
const { OPEN_RANGE, RANGE } = require('./constants')

module.exports = function getInterpretedDateRangeFromOneDate({
  dateType,
  endDay: endDayInput,
  endMonth: endMonthInput,
  endYear: endYearInput,
  startDay: startDayInput,
  startMonth: startMonthInput,
  startYear: startYearInput,
  ...rest
}) {
  if (!dateType) {
    return buildDateRange({
      ...rest,
    })
  }

  const endDay = endDayInput ? Number(endDayInput) : undefined
  const endMonth = endMonthInput ? Number(endMonthInput) : undefined
  const endYear = endYearInput ? Number(endYearInput) : undefined

  const startDay = startDayInput ? Number(startDayInput) : undefined
  const startMonth = startMonthInput ? Number(startMonthInput) : undefined
  const startYear = startYearInput ? Number(startYearInput) : undefined

  if (dateType === OPEN_RANGE || dateType === RANGE) {
    return buildDateRange({
      ...rest,
      dateType,

      endDay,
      endInterpretedTimestamp: getTimestampFromYMD({
        day: endDay,
        isEndDate: true,
        month: endMonth,
        year: endYear,
      }),
      endMonth,
      endYear,

      startDay,
      startInterpretedTimestamp: getTimestampFromYMD({
        day: startDay,
        isStartDate: true,
        month: startMonth,
        year: startYear,
      }),
      startMonth,
      startYear,
    })
  }

  throw new Error(
    `dateType ${
      dateType
    } not compatible with getInterpretedDateRangeFromTwoDates. maybe you should use getInterpretedDateRangeFromOneDate?`
  )
}
