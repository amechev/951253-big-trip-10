import {getRandomArrayItem, getRandomIntegerNumber, getRandomPicture} from '../utils.js';
import {Options} from '../const.js';
import {Activities, Cities, Transfers} from "../const";

const LOREM_TEXT = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`];
const PICTURES_MIN = 1;
const PICTURES_MAX = 9;
const DESCRIPTIONS_MIN = 1;
const DESCRIPTION_MAX = 3;
const OPTIONS_MIN = 0;
const OPTIONS_MAX = 2;

export const getSomeText = () => {
  return LOREM_TEXT.slice(0, getRandomIntegerNumber(DESCRIPTIONS_MIN, DESCRIPTION_MAX)).join(`\n`);
};

const getRandomPictures = () => {
  const pictures = [];
  const picturesCnt = getRandomIntegerNumber(PICTURES_MIN, PICTURES_MAX + 1);
  for (let i = 0; i < picturesCnt; i++) {
    pictures.push(getRandomPicture());
  }
  return pictures;
};

const getRandomOptions = () => {
  const optionsCnt = getRandomIntegerNumber(OPTIONS_MIN, OPTIONS_MAX + 1);
  const options = [];
  for (let i = 0; i < optionsCnt; i++) {
    options.push(getRandomArrayItem(Options).type);
  }
  return options;
};

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

let randomFirstDate = getRandomDate(new Date(2019, 1, 1), new Date(2020, 12, 31));

const getPrice = () => {
  return getRandomIntegerNumber(1, 9) * 100;
};

export const generateCard = () => {
  const start = randomFirstDate;
  randomFirstDate = new Date(randomFirstDate.setHours(randomFirstDate.getHours() + 2));
  const finish = randomFirstDate;
  return {
    type: getRandomArrayItem(Transfers.concat(Activities)),
    location: getRandomArrayItem(Cities),
    pictures: getRandomPictures(),
    description: getSomeText(),
    start,
    finish,
    price: getPrice(),
    options: getRandomOptions(),
  };
};

export const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};
