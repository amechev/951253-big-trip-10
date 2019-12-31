import InfoComponent from "./components/info";
import TotalComponent from "./components/total";
import MenuComponent from "./components/menu";
import TripController from "./controllers/trip";
import PointsComponent from './components/points.js';
import PointsModel from './models/points.js';
import {render, RenderPosition} from "./utils/render";
import {generateCards} from "./mock/card";
import {generateMenu} from "./mock/menu";
import FilterController from "./controllers/filters";
import 'flatpickr/dist/flatpickr.css';

const POINTS_COUNT = 4;
const points = generateCards(POINTS_COUNT);
const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const headerElement = document.querySelector(`.trip-main`);
const siteControlsElement = document.querySelector(`.trip-controls`);
const sitePointsElement = document.querySelector(`.trip-events`);

const menuItems = generateMenu();
const menuComponent = new MenuComponent(menuItems);
render(siteControlsElement, menuComponent, RenderPosition.BEFOREEND);

const filterController = new FilterController(siteControlsElement, pointsModel);
filterController.render();

const siteInfoElement = document.querySelector(`.trip-info`);

render(siteInfoElement, new InfoComponent(pointsModel), RenderPosition.BEFOREEND);
render(siteInfoElement, new TotalComponent(pointsModel), RenderPosition.BEFOREEND);

const pointsComponent = new PointsComponent();
render(sitePointsElement, pointsComponent, RenderPosition.BEFOREEND);

const tripController = new TripController(pointsComponent, pointsModel);
tripController.render();

headerElement.querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    tripController.createPoint();
  });
