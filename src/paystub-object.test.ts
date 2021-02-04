import { PayStubWrapper, PayStub } from './paystub-object';
import raw from './paystub-object.sample';

const wrapper = new PayStubWrapper(raw);

test('should correctly extract gross pay', () => {
  expect(wrapper.getGrossPay()).toBeCloseTo(3127.9, 2);
});

test('should correctly extract taxes', () => {
  expect(wrapper.getTaxes()).toBeCloseTo(-678.58, 2);
});

test('should correctly extract hsa', () => {
  expect(wrapper.getHSA()).toBeCloseTo(-8.95, 2);
});

test('should correctly extract health', () => {
  expect(wrapper.getHealth()).toBeCloseTo(-16.5, 2);
});

test('should correctly extract retirement', () => {
  expect(wrapper.getRetirement()).toBeCloseTo(-122.76, 2);
});

test('should correctly extract net pay', () => {
  expect(wrapper.getNetPay()).toBeCloseTo(2301.11, 2);
});

xtest('should correctly throw if no match', () => {
  const faultyStub: unknown = 'afweawf';
  new PayStubWrapper(faultyStub as PayStub);
  expect(() => wrapper.getGrossPay()).toThrow(
    new RegExp(`Unable to parse .* from ${faultyStub}`),
  );
});
