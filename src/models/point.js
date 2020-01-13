export default class Point {
  constructor(data) {
    if (data) {
      this.id = data[`id`];
      this.type = data[`type`];
      this.start = data[`date_from`];
      this.finish = data[`date_to`];
      this.destination = data[`destination`];
      this.price = data[`base_price`];
      this.isFavorite = data[`is_favorite`];
      this.options = data[`offers`];
    }

  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'date_from': this.start ? this.start.toISOString() : null,
      'date_to': this.finish ? this.finish.toISOString() : null,
      'offers': Array.from(this.options),
      'destination': this.destination,
      'base_price': this.price,
      'is_favorite': this.isFavorite
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
