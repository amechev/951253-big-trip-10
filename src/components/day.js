import {MonthNames} from "../const";

export const createDayItemTemplate = (date, cnt) => {
  const dateTime = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  const dateText = `${MonthNames[date.getMonth() - 1]} ${date.getDate()}`;
  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${cnt}</span>
          <time class="day__date" datetime="${dateTime}">${dateText}</time>
        </div>

        <ul class="trip-events__list"></ul>
     </li>`
  );
};
