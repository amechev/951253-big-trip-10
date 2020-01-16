import moment from "moment";

export const formatDate = (date) => {
  return moment(date).format(`DD/MM/YY HH:mm`);
};

export const formatToDouble = (number) => {
  return number < 10 ? `0` + number : number;
};

export const formatDateToStringDiff = (diffTime) => {
  let diffDays = +moment.duration(diffTime)._data.days;
  diffDays = diffDays ? formatToDouble(diffDays) + `D ` : ``;
  let diffHours = +moment.duration(diffTime)._data.hours;
  diffHours = diffHours ? formatToDouble(diffHours) + `H ` : ``;
  let diffMinutes = +moment.duration(diffTime)._data.minutes;
  diffMinutes = diffMinutes ? formatToDouble(diffMinutes) + `M` : ``;
  return diffDays + diffHours + diffMinutes;
};
