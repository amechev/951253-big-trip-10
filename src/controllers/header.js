import HeaderComponent from "../components/header";
import {render, RenderPosition} from "../utils/render";
import {MenuItems} from "../const";
import MenuComponent from "../components/menu";
import FilterController from "./filters";
import InfoComponent from "../components/info";
import TotalComponent from "../components/total";

export const MenuItem = {
  NEW_POINT: `New`,
  STATISTICS: `Stats`,
  POINTS: `Table`,
};

export default class HeaderController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._infoContainerElement = null;
    this._menuComponent = null;
    this._clickHandler = null;


    this._onDataChange = this._onDataChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const headerComponent = new HeaderComponent();
    render(container, headerComponent, RenderPosition.BEFOREEND);
    headerComponent.getElement().querySelector(`.trip-main__event-add-btn`)
      .addEventListener(`click`, () => {
        this._clickHandler(MenuItem.NEW_POINT);
      });

    const controlsContainerElement = document.querySelector(`.trip-controls`);

    const menuItems = MenuItems;
    this._menuComponent = new MenuComponent(menuItems);
    render(controlsContainerElement, this._menuComponent, RenderPosition.BEFOREEND);

    const filterController = new FilterController(controlsContainerElement, this._pointsModel);
    filterController.render();

    this._infoContainerElement = document.querySelector(`.trip-info`);
    this._renderInfo();
  }

  _renderInfo() {
    render(this._infoContainerElement, new InfoComponent(this._pointsModel), RenderPosition.BEFOREEND);
    render(this._infoContainerElement, new TotalComponent(this._pointsModel), RenderPosition.BEFOREEND);
  }

  _onDataChange() {
    this._infoContainerElement.innerHTML = ``;
    this._renderInfo();
  }

  setActiveItem(menuItem) {
    this._menuComponent.setActiveItem(menuItem);
  }

  setOnChange(handler) {
    this._clickHandler = handler;
    this._menuComponent.setOnChange((menuItem) => {
      this.setActiveItem(menuItem);
      this._clickHandler(menuItem);
    });
  }
}
