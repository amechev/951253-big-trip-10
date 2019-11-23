import {createSiteMenuTemplate} from "./components/menu";
import {createSiteFilterTemplate} from "./components/filter";
import {createDaysListTemplate} from "./components/days-list";
import {createDayItemTemplate} from "./components/day";
import {createCardTemplate} from "./components/card";
import {createCardEditTemplate} from "./components/card-edit";
import {createSiteInfoTemplate} from "./components/info";

const CARDS_COUNT = 3;

const render = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};

const siteControlsElement = document.querySelector(`.trip-controls`);
const siteEventsElement = document.querySelector(`.trip-events`);
const siteInfoElement = document.querySelector(`.trip-info`);

render(siteInfoElement, createSiteInfoTemplate(), `afterBegin`);
render(siteControlsElement, createSiteMenuTemplate(), `beforeEnd`);
render(siteControlsElement, createSiteFilterTemplate(), `beforeEnd`);
render(siteEventsElement, createCardEditTemplate(), `beforeEnd`);
render(siteEventsElement, createCardEditTemplate(), `beforeEnd`);
render(siteEventsElement, createDaysListTemplate(), `beforeEnd`);

const daysListElement = siteEventsElement.querySelector(`.trip-days`);
render(daysListElement, createDayItemTemplate(), `beforeEnd`);

const dayEventsListElement = siteEventsElement.querySelector(`.trip-events__list`);
new Array(CARDS_COUNT)
  .fill(``)
  .forEach(
      () => {
        render(dayEventsListElement, createCardTemplate(), `beforeEnd`);
      }
  );
