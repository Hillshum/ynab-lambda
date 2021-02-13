import { promises } from 'fs';
import { paystub } from '.';
import { PayStubWrapper } from './paystub-object';
import { validateDeductions } from './validate-deductions';

const main = async (path: string) => {
  const stub = await promises.readFile(path, 'utf-8')
  const payStub = new PayStubWrapper(JSON.parse(stub));

  const errors = validateDeductions(payStub);


  return errors;
}



export default () => main('afw').then(console.log).catch(console.error)