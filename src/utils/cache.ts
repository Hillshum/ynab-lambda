class Cache<T, K=void> {
  private promise?: Promise<T>;
  getter: (K) => Promise<T>;
  timestamp = 0;
  ttlSecs;
  isSettled = false;


  constructor(getter: (K) => Promise<T>, ttlSecs = 300) {
    this.getter = getter;
    this.ttlSecs = ttlSecs;
  }

  get(arg: K): Promise<T> {

    // promise is currently pending
    if (this.promise && !this.isSettled) {
      return this.promise;
    }


    const timeDelta = Date.now() - this.timestamp
    // promise is settled and ttl has not expired
    if (this.promise && timeDelta < this.ttlSecs * 1000) {
      return this.promise;
    }

    // promise is settled and ttl has expired
    // or promise is undefined
    this.promise = this.getter(arg)
    this.isSettled = false;
    this.timestamp = 0;
    this.promise.then(()=>{
      this.timestamp = Date.now();
      this.isSettled = true;
    }).catch(()=> {
      this.isSettled = true;
      this.promise = undefined;
    })

    return this.promise;
  }
}

export default Cache;
