import CardComponent from "../components/card";
import CardEditComponent from "../components/card-edit";
import {render, RenderPosition, replace} from "../utils/render";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._cardComponent = null;
    this._cardEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point) {
    const oldCardComponent = this._cardComponent;
    const oldCardEditComponent = this._cardEditComponent;

    this._cardComponent = new CardComponent(point);
    this._cardEditComponent = new CardEditComponent(point);

    this._cardComponent.setEditButtonClickHandler(() => {
      this._replaceCardToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._cardEditComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        isFavorite: !point.isFavorite,
      }));
    });

    this._cardEditComponent.setSubmitHandler(() => {
      this._replaceEditToCard();
    });

    if (oldCardEditComponent && oldCardComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._cardEditComponent, oldCardEditComponent);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToCard();
    }
  }

  _replaceEditToCard() {
    this._cardEditComponent.reset();

    replace(this._cardComponent, this._cardEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceCardToEdit() {
    this._onViewChange();

    replace(this._cardEditComponent, this._cardComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
