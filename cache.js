

export class CacheController {
  constructor() {
    this.observers = {}
  }

  addToObservers(key, observer) {
    this.observers[key] = observer;
  }
}

export const CacheInstance = new CacheController();
