import { PayStubWrapper } from './paystub-object';

const regex = {
  gross: /^Gross Pay\$(.+)$/m,
  taxes: /^EE Taxes-\$(.+)$/m,
  hsa: /^\*HEALTH SAVINGS ACCT\n-\$(.+)$/m,
  lfsa: /^\*FSA HEALTH CARE\n-\$(.+)$/m,
  retirement: /^EE Benefits Post-Tax Deductions-\$(.+)$$/m,
  net: /^Net Pay\$(.+)$/m,

}

export type TransactionType =
  | 'gross'
  | 'taxes'
  | 'hsa'
  | 'lfsa'
  | 'retirement'
  | 'net'
  | 'shared_budget_contribution'
  | 'retirement_gm'
  | 'retirement_total';

type ParsedStub = Record<TransactionType, number>;

const checkRegex = (regex: RegExp, corpus: string) => {
  const match = corpus.match(regex);
  const str = match && match[1] || null;
  const result = Number(str?.replace(',', ''));
  return result
}

export const parsePaystub = (stub: string): ParsedStub => {
  return Object.entries(regex).reduce((prev, [key, reg]) => {
    const match = checkRegex(reg, stub);

    if (isNaN(match)) {
      throw new Error(`Unable to parse ${key} from ${stub}`);
    }

    return {...prev, [key]: match};
  }, {}) as ParsedStub;

};
