import AbstractComponent from './abstract-component.js';

const createBoardTemplate = () => {
  return (
    `<section class="trip-events"></section>`
  );
};

export default class Points extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
