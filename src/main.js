import {render, RenderPosition} from "./utils/render";
import InfoComponent from "./components/info";
import TotalComponent from "./components/total";
import {generateCards} from "./mock/card";
import {generateMenu} from "./mock/menu";
import MenuComponent from "./components/menu";
import {generateFilters} from "./mock/filters";
import FilterComponent from "./components/filter";
import TripController from "./controllers/trip";

const CARDS_COUNT = 10;
const events = generateCards(CARDS_COUNT);
const siteControlsElement = document.querySelector(`.trip-controls`);
const siteEventsElement = document.querySelector(`.trip-events`);

const menu = generateMenu();
render(siteControlsElement, new MenuComponent(menu), RenderPosition.BEFOREEND);

const filters = generateFilters();
render(siteControlsElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const siteInfoElement = document.querySelector(`.trip-info`);
if (events.length) {
  render(siteInfoElement, new InfoComponent(events), RenderPosition.BEFOREEND);
  render(siteInfoElement, new TotalComponent(events), RenderPosition.BEFOREEND);
}

const tripController = new TripController(siteEventsElement);
tripController.render(events);
