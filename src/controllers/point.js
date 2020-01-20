import PointComponent from "../components/point";
import PointEditComponent from "../components/point-edit";
import {render, RenderPosition, replace, remove} from "../utils/render";
import {SHAKE_ANIMATION_TIMEOUT, TRANSFERS} from "../const";
import PointModel from '../models/point.js';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const emptyPoint = {
  type: TRANSFERS[0],
  destination: ``,
  pictures: null,
  description: ``,
  start: new Date(),
  finish: new Date(),
  price: 0,
  options: [],
  isFavorite: false
};

const parseFormData = (formData, context) => {

  const point = new PointModel();
  point.type = formData.get(`event-type`);
  point.destination = context._pointDestination;
  point.start = context._flatpickrStart.parseDate(formData.get(`event-start-time`), `d/m/y H:i`);
  point.finish = context._flatpickrFinish.parseDate(formData.get(`event-end-time`), `d/m/y H:i`);
  point.price = parseInt(formData.get(`event-price`), 10);
  point.isFavorite = !!formData.get(`event-favorite`);
  point.options = context._pointOptions;

  return point;
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point, offers, destinations, mode) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;
    this._mode = mode;

    this._pointComponent = new PointComponent(point);
    this._pointEditComponent = new PointEditComponent(point, offers, destinations, mode);

    this._pointComponent.setEditButtonClickHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setFavoritesButtonClickHandler(() => {
      const newPoint = PointModel.clone(point);
      newPoint.isFavorite = !newPoint.isFavorite;
      const disableRerender = true;

      this._onDataChange(this, point, newPoint, disableRerender);
    });

    this._pointEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      this._pointEditComponent.setData({
        SAVE_BUTTON_TXT: `Saving...`,
      });

      const formData = this._pointEditComponent.getData();
      const data = parseFormData(formData, this._pointEditComponent);

      this._onDataChange(this, point, data);
    });

    this._pointEditComponent.setDeleteButtonClickHandler(() => {
      this._pointEditComponent.setData({
        DELETE_BUTTON_TXT: `Deleting...`,
      });

      this._onDataChange(this, point, null);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldPointEditComponent && oldPointComponent) {
          replace(this._pointComponent, oldPointComponent);
          replace(this._pointEditComponent, oldPointEditComponent);
          this._replaceEditToPoint();
        } else {
          render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldPointEditComponent && oldPointComponent) {
          remove(oldPointComponent);
          remove(oldPointEditComponent);
        }
        this._pointEditComponent.recoveryListeners();
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._pointEditComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  destroy() {
    remove(this._pointEditComponent);
    remove(this._pointComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._pointEditComponent.shake();
    this._pointComponent.shake();

    setTimeout(() => {
      this._pointEditComponent.stopShake();
      this._pointComponent.stopShake();

      this._pointEditComponent.setData({
        SAVE_BUTTON_TXT: `Save`,
        DELETE_BUTTON_TXT: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _replaceEditToPoint() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._pointEditComponent.reset();

    if (document.contains(this._pointEditComponent.getElement())) {
      replace(this._pointComponent, this._pointEditComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _replacePointToEdit() {
    this._onViewChange();

    replace(this._pointEditComponent, this._pointComponent);
    this._pointEditComponent.recoveryListeners();
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, emptyPoint, null);
      }
      this._replaceEditToPoint();
    }
  }
}
