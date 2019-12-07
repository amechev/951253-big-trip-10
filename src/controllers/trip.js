import {render, RenderPosition, replace} from "../utils/render";
import CardComponent from "../components/card";
import CardEditComponent from "../components/card-edit";
import NoCardsComponent from "../components/no-cards";
import DaysListComponent from "../components/days-list";
import DayComponent from "../components/day";

const renderCard = (task, day) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => {
    replace(cardComponent, cardEditComponent);
  };

  const replaceTaskToEdit = () => {
    replace(cardEditComponent, cardComponent);
  };

  const cardComponent = new CardComponent(task);
  cardComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const cardEditComponent = new CardEditComponent(task);
  cardEditComponent.setSubmitHandler(() => {
    replaceEditToTask();
  });

  render(day, cardComponent, RenderPosition.BEFOREEND);
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noCardsComponent = new NoCardsComponent();
    this._daysListComponent = new DaysListComponent();
  }

  render(events) {
    if (!events.length) {
      render(this._container, this._noCardsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);

    const daysListElement = this._container.querySelector(`.trip-days`);
    let currentDay = 1;
    let currentDate = events[0].start;
    render(daysListElement, new DayComponent(currentDate, currentDay), RenderPosition.BEFOREEND);
    let dayEventsListElement = this._container.querySelector(`.trip-events__list`);

    events.forEach((item) => {
      if (item.start.getDate() !== currentDate.getDate()) {
        currentDay++;
        currentDate = item.start;
        render(daysListElement, new DayComponent(currentDate, currentDay), RenderPosition.BEFOREEND);
        const nodes = this._container.querySelectorAll(`.trip-events__list`);
        dayEventsListElement = nodes[nodes.length - 1];
      }

      renderCard(item, dayEventsListElement);
    });
  }
}
