
class Cache<T> {
  private store?: T;
  private promise?: Promise<T>
  getter: () => Promise<T>
  
  // TODO: Fix this to use better types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(getter: (...args: any) => Promise<T>) {
    this.getter = getter;
  }

  get(): Promise<T> {
    if (this.store) {
      return Promise.resolve(this.store);
    }

    if (this.promise) {
      return this.promise;
    }

    this.promise = this.getter();

    this.promise.then(data => this.store = data);

    return this.promise

  }
}

export default Cache