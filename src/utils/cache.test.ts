import Cache from './cache';

const cachedResult = 42;

const getter = jest.fn();
getter.mockReturnValue(Promise.resolve(cachedResult));

describe('Cache', () => {
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
});
