import {MonthNames} from "../const";

export const createSiteInfoTemplate = (points) => {
  const firstDateOfTrip = `${MonthNames[points[0].start.getMonth() - 1]} ${points[0].start.getDate()}`;
  const latsDateOfTrip = points[points.length - 1].finish.getDate();
  const firstCity = points[0].location;
  const lastCity = points[points.length - 1].location;
  let total = 0;
  points.forEach((el) => {
    total += el.price;
  });

  return (
    `<div class="trip-info__main">
        <h1 class="trip-info__title">${firstCity} &mdash; ... &mdash; ${lastCity}</h1>

        <p class="trip-info__dates">${firstDateOfTrip}&nbsp;&mdash;&nbsp;${latsDateOfTrip}</p>
      </div>
      <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
      </p>`
  );
};
