import {FilterType} from '../const.js';

export const getEverythingPoints = (points) => {
  return points;
};

export const getFuturePoints = (points) => {
  return points.filter((point) => new Date(point.start) > new Date());
};

export const getPastPoints = (points) => {
  return points.filter((point) => new Date(point.start) < new Date());
};

export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FilterType.FUTURE:
      return getFuturePoints(points);
    case FilterType.PAST:
      return getPastPoints(points);
    case FilterType.ALL:
      return getEverythingPoints(points);
  }

  return points;
};
