import AbstractComponent from './abstract-component.js';
import {SHAKE_ANIMATION_TIMEOUT} from "../const";

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }

  shake() {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
  }

  stopShake() {
    this.getElement().style.animation = ``;
  }
}
