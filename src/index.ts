import { handler as venmo } from './functions/venmo';
import paystubHandler from './functions/paystub';

import lambdaWrapper from "./utils/lambda-wrapper";

const paystub = lambdaWrapper(paystubHandler);
export {
  venmo,
  paystub,
}