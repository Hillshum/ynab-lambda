import { parsePaystub } from './parse-paystub'

const stub = `
 Gross Pay$2,351.80
 Earnings$2,351.80
 EE Taxes-$221.91
 EE Benefits Pre-tax Deductions-$119.52
*HEALTH SAVINGS ACCT
-$8.95
*HEALTH CARE
-$16.50
*RSP PRE-TAX BASIC
-$94.07
 EE Benefits Post-Tax Deductions$0.00
 Employee Deductions$0.00
 Net Pay$2,010.37
 Employer Contributions$0.00

 `

test('should correctly extract gross pay', () => {
  expect(parsePaystub(stub).gross).toBe(2351.80);
})

test('should correctly extract taxes', () => {
  expect(parsePaystub(stub).taxes).toBe(221.91);
})

test('should correctly extract hsa', () => {
  expect(parsePaystub(stub).hsa).toBe(8.95);
})

test('should correctly extract health', () => {
  expect(parsePaystub(stub).health).toBe(16.50);
})

test('should correctly extract retirement', () => {
  expect(parsePaystub(stub).retirement).toBe(94.07);
})

test('should correctly extract net pay', () => {
  expect(parsePaystub(stub).net).toBe(2010.37);
})

test('should correctly throw if no match', () => {
  const faultyStub = 'awfwast2535';
  expect(() => parsePaystub(faultyStub)).toThrow(new RegExp(`Unable to parse .* from ${faultyStub}`));
})