import AbstractComponent from "./abstract-component";

const createHeaderTemplate = () => {
  return (
    `<div class="trip-main">
      <section class="trip-main__trip-info  trip-info">
      <!-- Маршрут -->
      </section>

      <div class="trip-main__trip-controls  trip-controls">
        <h2 class="visually-hidden">Switch trip view</h2>
        <!-- Меню -->

        <h2 class="visually-hidden">Filter events</h2>
        <!-- Фильтры -->
      </div>

      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" id="New" type="button">New event</button>
     </div>`
  );
};

export default class Header extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createHeaderTemplate(this._points);
  }

  setNewPointClickHandler(handler) {
    this.getElement().querySelector(`.trip-main__event-add-btn`)
      .addEventListener(`click`, () => {
        handler();
      });
  }
}
