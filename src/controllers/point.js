import PointComponent from "../components/point";
import PointEditComponent from "../components/point-edit";
import {render, RenderPosition, replace, remove} from "../utils/render";
import {Transfers} from "../const";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyPoint = {
  type: Transfers[0],
  destination: ``,
  pictures: null,
  description: ``,
  start: new Date(),
  finish: new Date(),
  price: 0,
  options: [],
  isFavorite: false
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

  render(point, mode) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;
    this._mode = mode;

    this._pointComponent = new PointComponent(point);
    this._pointEditComponent = new PointEditComponent(point, mode);

    this._pointComponent.setEditButtonClickHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        isFavorite: !point.isFavorite,
      }));
    });

    this._pointEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._pointEditComponent.getData();
      this._onDataChange(this, point, data);
    });

    this._pointEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, point, null));

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

  _replaceEditToPoint() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._pointEditComponent.reset();

    replace(this._pointComponent, this._pointEditComponent);

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
        this._onDataChange(this, EmptyPoint, null);
      }
      this._replaceEditToPoint();
    }
  }
}
