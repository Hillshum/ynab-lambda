import Cache from './cache';

const cachedResult = 42;

const getter = jest.fn();

describe('Cache', () => {
  beforeEach(() => {
    getter.mockReturnValue(Promise.resolve(cachedResult));
  });

  test('should only call the getter once for a number of parallel requests', async () => {
    const cache = new Cache(getter);
    await Promise.all([cache.get(), cache.get(), cache.get()]);

    expect(getter).toHaveBeenCalledTimes(1);
  });
  test('should only call the getter once for a number of sequential requests', async () => {
    const cache = new Cache(getter);
    await cache.get();
    await cache.get();
    await cache.get();
    await cache.get();
    await cache.get();
    await cache.get();
    await cache.get();

    expect(getter).toHaveBeenCalledTimes(1);
  });

  test('should make a new request if the cache is stale', async () => {
    const cache = new Cache(getter, 1);
    await cache.get();
    await cache.get();
    await new Promise(resolve => setTimeout(resolve, 2000))
    await cache.get();

    expect(getter).toHaveBeenCalledTimes(2);

  })

  test('should handle all exceptions thrown by the getter', async () => {
    const getter = jest.fn();
    getter.mockReturnValue(Promise.reject('error'));
    const cache = new Cache(getter);
    await expect(cache.get()).rejects.toEqual('error');
  })
});
