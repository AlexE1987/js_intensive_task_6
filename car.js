class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;

  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;

  set brand(value) {
    if (typeof value !== 'string' || value.length > 50) return;
    this.#brand = value;
  }
  get brand() {
    return this.#brand;
  }

  set model(value) {
    if (typeof value !== 'string' || value.length > 50) return;
    this.#model = value;
  }
  get model() {
    return this.#model;
  }

  set yearOfManufacturing(value) {
    if (!Number.isInteger(value) || value < 1900 || value > new Date().getFullYear()) return;
    this.#yearOfManufacturing = value;
  }
  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set maxSpeed(value) {
    if (!Number.isInteger(value) || value < 100 || value > 300) return;
    this.#maxSpeed = value;
  }
  get maxSpeed() {
    return `${this.#maxSpeed} km/h`;
  }

  set maxFuelVolume(value) {
    if (!Number.isInteger(value) || value < 5 || value > 20) return;
    this.#maxFuelVolume = value;
  }
  get maxFuelVolume() {
    return `${this.#maxFuelVolume} l`;
  }

  set fuelConsumption(value) {
    if (!Number.isInteger(value)) return;
    this.#fuelConsumption = value;
  }
  get fuelConsumption() {
    return `${this.#fuelConsumption} l/100km`;
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return this.#mileage;
  }

  start() {
    if (this.#isStarted) throw Error('Машина уже заведена');
    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.#isStarted) throw Error('Машина ещё не заведена');
    this.#isStarted = false;
  }

  fillUpGasTank(fuelLiters) {
    if (!Number.isInteger(fuelLiters) || fuelLiters < 0)
      throw Error('Неверное количество топлива для заправки');

    if (fuelLiters + this.#currentFuelVolume > this.#maxFuelVolume)
      throw Error('Топливный бак переполнен');

    this.#currentFuelVolume += fuelLiters;
  }

  drive(speed, hours) {
    let requiredFuelForTrip = ((speed * hours) / 100) * this.#fuelConsumption;

    if (!Number.isInteger(speed) || speed < 0) throw Error('Неверная скорость');
    if (!Number.isInteger(hours) || hours < 0) throw Error('Неверное количество часов');
    if (speed > this.#maxSpeed) throw Error('Машина не может ехать так быстро');
    if (!this.#isStarted) throw Error('Машина должна быть заведена, чтобы ехать');
    if (requiredFuelForTrip > this.#currentFuelVolume) throw Error('Недостаточно топлива');

    this.#currentFuelVolume -= requiredFuelForTrip;
    this.#mileage += speed * hours;
  }
}

module.exports = Car;
