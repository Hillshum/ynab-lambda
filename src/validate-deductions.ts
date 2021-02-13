import { decodedTextSpanIntersectsWith } from "typescript";
import { paystub } from ".";
import { PayStubWrapper } from "./paystub-object";

const TOLERANCE = .01

const RETIREMENT_PERCETAGE = -.04;

const SS_PERCENTAGE = -.062;

const MEDICARE_PERCENTAGE = -0.0145

const TAX_PAY_PERIODS = 24 // line 1b

const LINE_1G_NOT_CHECKED_SINGLE = 8600
const COLUMN_A = 44475 // Bottom of marginal bracket
const COLUMN_C = 4664 // witholding from lower brackets
const COLUMN_D = .22 // rate at top bracket

const W4_STEP3 = 0;
const W4_STEP4A = 0
const W4_STEP4B = 0
const W4_STEP4C = 0;


class DeductionsError extends Error {
  constructor(type: string, expected: number, received: number) {
    super(`Issue with ${type}: expected ${expected}, got ${received}`);
  }
}



const areFloatsEqual = (a: number, b: number) => {

  return Math.abs(a - b) < TOLERANCE;
}

const getFICA = (paystub: PayStubWrapper) => {
  return paystub.getGrossPay() + paystub.getHSA() + paystub.getHealth() + paystub.getEmployerContributions();
}

const getTaxable = (paystub: PayStubWrapper) => {
  return getFICA(paystub) + paystub.getRetirement();
}


const calculateIncomeTax = (paystub: PayStubWrapper) => {

  const line1a = getTaxable(paystub);
  const line1b = TAX_PAY_PERIODS;
  const line1c = line1a * line1b;
  const line1d = W4_STEP4A
  const line1e = line1c + line1d;
  const line1f = W4_STEP4B
  const line1g = LINE_1G_NOT_CHECKED_SINGLE;
  const line1h = line1f + line1g;
  const line1i = line1e - line1h; // adjusted annual wage

  const line2a = line1i;
  const line2b = COLUMN_A; // bottom of marginal bracket
  const line2c = COLUMN_C; // tax owed on lower brackets
  const line2d = COLUMN_D; // marginal tax rate
  const line2e = line2a - line2b; // income to be taxed at top bracket
  const line2f = line2e * line2d; // tax owed from top bracket
  const line2g = line2c + line2f; // total tax owed
  const line2h = line2g / TAX_PAY_PERIODS; // Tentative Withholding Amount

  const line3a = W4_STEP3;
  const line3b = line3a / TAX_PAY_PERIODS;
  const line3c = line2h - line3b;

  const line4a = W4_STEP4C;
  const line4b = line3c + line4a; // withholding this pay period

  return line4b * -1;
}

const validateRetirement = (paystub: PayStubWrapper) => {
  const expectedRetirement = paystub.getGrossPay() * RETIREMENT_PERCETAGE;

  const receivedRetirement = paystub.getRetirement();

  if (areFloatsEqual(expectedRetirement, receivedRetirement)) {
    return;
  }

  throw new DeductionsError('RSP', expectedRetirement, receivedRetirement)
}

const validateMedicare = (paystub: PayStubWrapper) => {
  const expectedMedicare = getFICA(paystub) * MEDICARE_PERCENTAGE;

  const receievedMedicare = paystub.getMedicare();

  if (areFloatsEqual(expectedMedicare, receievedMedicare)) {
    return;
  }

  throw new DeductionsError('Medicare', expectedMedicare, receievedMedicare)
}

const validateSS = (paystub: PayStubWrapper) => {
  const expected = getFICA(paystub) * SS_PERCENTAGE;

  const received = paystub.getSS();

  if (areFloatsEqual(expected, received)) {
    return
  }
  throw new DeductionsError('Social Security', expected, received);
}

const validateTax = (paystub: PayStubWrapper) => {
  const expected = calculateIncomeTax(paystub);
  const received = paystub.getIncomeTaxes();

  if (areFloatsEqual(expected, received)) {
    return;
  }
  throw new DeductionsError('Income Tax', expected, received);
}

const validators = [
  validateMedicare,
  validateRetirement,
  validateSS,
  validateTax,
]

const validateDeductions = (paystub: PayStubWrapper): DeductionsError[] => {
  const errors: DeductionsError[] = [];

  validators.forEach(validator => {
    try {
      validator(paystub);
    } catch (e) {
      if (e instanceof DeductionsError) {
        errors.push(e)
      } else {
        throw e
      }
    }
  })

  return errors;
}


export { validateDeductions }