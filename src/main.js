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

const CARDS_COUNT = 6;

const render = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};

const tripPoints = [];
for (let i = 0; i < CARDS_COUNT; i++) {
  tripPoints.push(generateCard());
}

const siteControlsElement = document.querySelector(`.trip-controls`);
const siteEventsElement = document.querySelector(`.trip-events`);
const siteInfoElement = document.querySelector(`.trip-info`);
const tasks = generateCards(CARDS_COUNT);

render(siteInfoElement, createSiteInfoTemplate(), `afterBegin`);
render(siteControlsElement, createSiteMenuTemplate(generateMenu()), `beforeEnd`);
render(siteControlsElement, createSiteFilterTemplate(generateFilters()), `beforeEnd`);
render(siteEventsElement, createDaysListTemplate(), `beforeEnd`);
const daysListElement = siteEventsElement.querySelector(`.trip-days`);
render(daysListElement, createDayItemTemplate(), `beforeEnd`);

const dayEventsListElement = siteEventsElement.querySelector(`.trip-events__list`);


tasks.forEach((item, key) => {
  if (key) {
    render(dayEventsListElement, createCardTemplate(item), `beforeEnd`);
  } else {
    render(dayEventsListElement, createCardEditTemplate(item), `beforeEnd`);
  }
});
