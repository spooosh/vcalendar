export const dayTemplate = (year, month, date) => {
    return {
        year: year,
        month: month,
        date: date
    };
};

export const getDaysInMonth = (year, month) => {
    let lastDate = new Date(year, month + 1, 0).getDate();

    return [...Array(lastDate).keys()].map(i => dayTemplate(year, month, i + 1));
};

export const getFirstWeek = (year, month, addWeek, startWeekDay) => {
    let first = new Date(year, month, 1);
    let firstDay = first.getDay() - startWeekDay;
    let diff = 7 - firstDay;

    diff = (diff >= 7)
        ? diff - 7
        : diff;

    if (addWeek) diff += addWeek * 7;

    return [...Array(diff).keys()].map(i => dayTemplate(year, month, i + 1));
};

export const getLastWeek = (year, month, startWeekDay) => {
    let last = new Date(year, month + 1, 0);

    let lastDate = last.getDate();
    let lastDay = last.getDay() + 1 - startWeekDay;
    let diff = lastDate - lastDay;

    let days = [...Array(lastDay).keys()].map(i => dayTemplate(year, month, diff + i + 1));

    return days.length < 7 ? days : [];
};

export const isPassed = date => {
    let today = new Date();
    today = new Date(`${today.getMonth() + 1}.${today.getDate()}.${today.getFullYear()}`);
    return date.getTime() < today.getTime();
};

export const dateUntil = (val, untilDate) => {
    return val.getTime() < untilDate.getTime();
};

export const dateAfter = (val, afterDate) => {
    return val.getTime() > afterDate.getTime();
};

export const getDateTime = date => {
    const newDate = new Date(date);

    const y = newDate.getFullYear();
    const d = newDate.getDate();
    const m = newDate.getMonth();

    return new Date(y, m, d).getTime();
};