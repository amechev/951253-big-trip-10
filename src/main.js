import {createSiteMenuTemplate} from "./components/menu";
import {createSiteFilterTemplate} from "./components/filter";
import {createDaysListTemplate} from "./components/days-list";
import {createDayItemTemplate} from "./components/day";
import {createCardTemplate} from "./components/card";
import {createCardEditTemplate} from "./components/card-edit";
import {createSiteInfoTemplate} from "./components/info";
import {generateCard, generateCards} from "./mock/card";
import {generateFilters} from "./mock/filters";
import {generateMenu} from "./mock/menu";

const CARDS_COUNT = 4;

const render = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};

const tripPoints = [];
for (let i = 0; i < CARDS_COUNT; i++) {
  tripPoints.push(generateCard());
}

const points = generateCards(CARDS_COUNT);
const siteControlsElement = document.querySelector(`.trip-controls`);
const siteEventsElement = document.querySelector(`.trip-events`);

render(siteControlsElement, createSiteMenuTemplate(generateMenu()), `beforeEnd`);
render(siteControlsElement, createSiteFilterTemplate(generateFilters()), `beforeEnd`);

render(siteEventsElement, createDaysListTemplate(), `beforeEnd`);
const daysListElement = siteEventsElement.querySelector(`.trip-days`);
let currentDay = 1;
let currentDate = points[0].start;
render(daysListElement, createDayItemTemplate(currentDate, currentDay), `beforeEnd`);
let dayEventsListElement = siteEventsElement.querySelector(`.trip-events__list`);

points.forEach((item, key) => {
  if (item.start.getDate() !== currentDate.getDate()) {
    currentDay++;
    currentDate = item.start;
    render(daysListElement, createDayItemTemplate(currentDate, currentDay), `beforeEnd`);
    const nodes = siteEventsElement.querySelectorAll(`.trip-events__list`);
    dayEventsListElement = nodes[nodes.length - 1];
  }
  if (key) {
    render(dayEventsListElement, createCardTemplate(item), `beforeEnd`);
  } else {
    render(dayEventsListElement, createCardEditTemplate(item), `beforeEnd`);
  }
});

const siteInfoElement = document.querySelector(`.trip-info`);
render(siteInfoElement, createSiteInfoTemplate(points), `afterBegin`);
