import MenuComponent from "./components/menu";
import FilterComponent from "./components/filter";
import DaysListComponent from "./components/days-list";
import DayComponent from "./components/day";
import CardComponent from "./components/card";
import CardEditComponent from "./components/card-edit";
import InfoComponent from "./components/info";
import TotalComponent from "./components/total";
import {generateCard, generateCards} from "./mock/card";
import {generateFilters} from "./mock/filters";
import {generateMenu} from "./mock/menu";
import {render, RenderPosition} from "./utils";

const CARDS_COUNT = 4;

const renderCard = (task, day) => {
  const cardComponent = new CardComponent(task);
  const cardEditComponent = new CardEditComponent(task);

  const openButton = cardComponent.getElement().querySelector(`.event__rollup-btn`);
  openButton.addEventListener(`click`, () => {
    day.replaceChild(cardEditComponent.getElement(), cardComponent.getElement());
  });

  const editForm = cardEditComponent.getElement();
  editForm.addEventListener(`submit`, () => {
    day.replaceChild(cardComponent.getElement(), cardEditComponent.getElement());
  });

  render(day, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

const tripPoints = [];
for (let i = 0; i < CARDS_COUNT; i++) {
  tripPoints.push(generateCard());
}

const points = generateCards(CARDS_COUNT);
const siteControlsElement = document.querySelector(`.trip-controls`);
const siteEventsElement = document.querySelector(`.trip-events`);

const menu = generateMenu();
render(siteControlsElement, new MenuComponent(menu).getElement(), RenderPosition.BEFOREEND);

const filters = generateFilters();
render(siteControlsElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(siteEventsElement, new DaysListComponent().getElement(), RenderPosition.BEFOREEND);

const daysListElement = siteEventsElement.querySelector(`.trip-days`);
let currentDay = 1;
let currentDate = points[0].start;
render(daysListElement, new DayComponent(currentDate, currentDay).getElement(), RenderPosition.BEFOREEND);
let dayEventsListElement = siteEventsElement.querySelector(`.trip-events__list`);

points.forEach((item) => {
  if (item.start.getDate() !== currentDate.getDate()) {
    currentDay++;
    currentDate = item.start;
    render(daysListElement, new DayComponent(currentDate, currentDay).getElement(), RenderPosition.BEFOREEND);
    const nodes = siteEventsElement.querySelectorAll(`.trip-events__list`);
    dayEventsListElement = nodes[nodes.length - 1];
  }

  renderCard(item, dayEventsListElement)

});

const siteInfoElement = document.querySelector(`.trip-info`);
render(siteInfoElement, new InfoComponent(points).getElement(), RenderPosition.BEFOREEND);
render(siteInfoElement, new TotalComponent(points).getElement(), RenderPosition.BEFOREEND);
