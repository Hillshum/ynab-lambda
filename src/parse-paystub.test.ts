

import { parsePaystub } from './parse-paystub'

const stub = `
anuary 12, 2024
 From: January 1, 2024 To: January 15, 2024

 Gross Pay$4,218.89
 Earnings$4,218.89
 EE Taxes-$879.36
 EE Benefits Pre-tax Deductions-$112.42
*FSA HEALTH CARE
-$2.00
*HEALTH SAVINGS ACCT
-$110.42
 EE Benefits Post-Tax Deductions-$253.13
 Employee Deductions$0.00
 Net Pay$2,973.98
 Employer Contributions$5.88

 `
test('should not throw', () => {
    expect(() => parsePaystub(stub)).not.toThrow();
})

test('should correctly extract gross pay', () => {
  expect(parsePaystub(stub).gross).toBe(4218.89);
})

test('should correctly extract taxes', () => {
  expect(parsePaystub(stub).taxes).toBe(879.36);
})

test('should correctly extract hsa', () => {
  expect(parsePaystub(stub).hsa).toBe(110.42);
})

test('should correctly extract lfsa', () => {
  expect(parsePaystub(stub).lfsa).toBe(2);
})

test('should correctly extract retirement', () => {
  expect(parsePaystub(stub).retirement).toBe(253.13);
})

test('should correctly extract net pay', () => {
  expect(parsePaystub(stub).net).toBe(2973.98);
})

test('should correctly throw if no match', () => {
  const faultyStub = 'awfwast2535';
  expect(() => parsePaystub(faultyStub)).toThrow(new RegExp(`Unable to parse .* from ${faultyStub}`));
})