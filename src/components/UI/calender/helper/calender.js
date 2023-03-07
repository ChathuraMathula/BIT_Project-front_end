/** Current Month */
export const THIS_MONTH = +new Date().getMonth() + 1;

/** Current Year */
export const THIS_YEAR = +new Date().getFullYear();

/** Current Day */
export const THIS_DAY = +new Date().getDay();

export const THIS_DATE = +new Date().getDate();

export const CALENDER_ROWS = 6;

export const CALENDER_MONTHS = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

export const WEEK_DAYS = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
};

/**
 *
 * @param {string} value value to be padded zeros to start
 * @param {number} padLength length of the pad
 * @returns A string (eg: if value = 5 & padLength 2, returns 05 as the result)
 */
export const padZero = (value, padLength) => {
  return `${value}`.padStart(length, "0");
};

/**
 *
 * @param {number} month eg: 1 for January, 2 for February
 * @param {number} year eg: 2023
 * @returns The number of days the month has
 */
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const monthsWith30Days = [4, 6, 9, 11]; // April | June | september | November
  const leapYear = year % 4 === 0;
  if (month === 2) {
    if (leapYear) {
      return 29;
    } else {
      return 28;
    }
  } else if (monthsWith30Days.includes(month)) {
    return 30;
  } else {
    return 31;
  }
};

/**
 *
 * @param {number} month eg: 1 for January, 2 for February
 * @param {number} year eg: 2023
 * @returns The day of the first day of the given month. eg: 1 for Sunday
 */
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  return +new Date(`${year}-${padZero(month, 2)}-01`).getDay() + 1;
};

export const getPreviousMonth = (month, year) => {
  const prevMonthYear = month > 1 ? year : year - 1;
  const prevMonth = month > 1 ? month - 1 : 12;
  return { month: prevMonth, year: prevMonthYear };
};

export const getNextMonth = (month, year) => {
  const nextMonthYear = month < 12 ? year : year + 1;
  const nextMonth = month < 12 ? month + 1 : 1;
  return { month: nextMonth, year: nextMonthYear };
};

export default (month = THIS_MONTH, year = THIS_YEAR) => {
  const firstDayOfCurrentMonth = getMonthFirstDay(month, year); // eg: 1 for Sunday
  const daysFromCurrentMonth = getMonthDays(month, year); // eg: 31
  const daysFromPrevMonth = firstDayOfCurrentMonth - 1;
  const daysFromNextMonth =
    CALENDER_ROWS * 7 - (daysFromCurrentMonth + daysFromPrevMonth);

  const { month: previousMonth, year: previousMonthYear } = getPreviousMonth(
    month,
    year
  );
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  const numberOfPreviousMonthDays = getMonthDays(
    previousMonth,
    previousMonthYear
  );

  const previousMonthDates = [...new Array(daysFromPrevMonth)].map(
    (v, index) => {
      const day = index + 1 + (numberOfPreviousMonthDays - daysFromPrevMonth);
      return {
        date: new Date(
          `${previousMonthYear}-${padZero(previousMonth, 2)}-${day}`
        ),
        disabled: true,
      };
    }
  );

  const currentMonthDates = [...new Array(daysFromCurrentMonth)].map(
    (v, index) => {
      const day = index + 1;
      if (year === THIS_YEAR && month === THIS_MONTH && day < THIS_DATE) {
        return {
          date: new Date(`${year}-${padZero(month, 2)}-${padZero(day, 2)}`),
          disabled: true,
        };
      } else if (year === THIS_YEAR && month === THIS_MONTH && day === THIS_DATE) {
        return {
          date: new Date(`${year}-${padZero(month, 2)}-${padZero(day, 2)}`),
          disabled: false,
          today: true,
        };
      } else {
        return {
          date: new Date(`${year}-${padZero(month, 2)}-${padZero(day, 2)}`),
          disabled: false,
        };
      }
    }
  );

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((v, index) => {
    const day = index + 1;
    return {
      date: new Date(
        `${nextMonthYear}-${padZero(nextMonth, 2)}-${padZero(day, 2)}`
      ),
      disabled: true,
    };
  });

  const datesArray = [
    ...previousMonthDates,
    ...currentMonthDates,
    ...nextMonthDates,
  ];

  let dates = [];

  for (let i = 0; i < datesArray.length; i += 7) {
    dates.push(datesArray.slice(i, i + 7));
  }

  return dates;
};
