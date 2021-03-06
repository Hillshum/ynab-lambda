import { PayStubWrapper } from './paystub-object';

// const regex = {
//   gross: /^ Gross Pay\$(.+)$/m,
//   taxes: /^ EE Taxes-\$(.+)$/m,
//   hsa: /^\*HEALTH SAVINGS ACCT\n-\$(.+)$/m,
//   health: /^\*HEALTH CARE\n-\$(.+)$/m,
//   retirement: /^\*RSP PRE-TAX BASIC\n-\$(.+)$/m,
//   net: /^ Net Pay\$(.+)$/m,

// }

export type TransactionType =
  | 'gross'
  | 'taxes'
  | 'hsa'
  | 'health'
  | 'retirement'
  | 'net'
  | 'retirement_gm'
  | 'retirement_total';

type ParsedStub = Record<TransactionType, number>;

// const checkRegex = (regex: RegExp, corpus: string) => {
//   const match = corpus.match(regex);
//   const str = match && match[1] || null;
//   const result = Number(str?.replace(',', ''));
//   return result
// }

export const parsePaystub = (stub: string): ParsedStub => {
  // return Object.entries(regex).reduce((prev, [key, reg]) => {
  //   const match = checkRegex(reg, stub);

  //   if (isNaN(match)) {
  //     throw new Error(`Unable to parse ${key} from ${stub}`);
  //   }

  //   return {...prev, [key]: match};
  // }, {}) as ParsedStub;

  const wrapper = new PayStubWrapper(JSON.parse(stub));

  return {
    gross: wrapper.getGrossPay(),
    taxes: wrapper.getTaxes(),
    hsa: wrapper.getHSA(),
    health: wrapper.getHealth(),
    net: wrapper.getNetPay(),
    retirement: wrapper.getRetirement(),
  } as ParsedStub;
};
