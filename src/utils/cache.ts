class Cache<T, K=void> {
  private store?: T;
  private promise?: Promise<T>;
  getter: (K) => Promise<T>;

  // TODO: Fix this to use better types
  constructor(getter: (K) => Promise<T>) {
    this.getter = getter;
  }

  get(arg: K): Promise<T> {
    if (this.store) {
      return Promise.resolve(this.store);
    }

    if (this.promise) {
      return this.promise;
    }

    this.promise = this.getter(arg);

    this.promise.then((data) => (this.store = data));

    return this.promise;
  }
}

export default Cache;
