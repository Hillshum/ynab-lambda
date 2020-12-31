
interface WageType {
  id: string;
  label: string;
  amount: number;
  YTDamount: number;
}

interface Bucket {
  YTDamount: number;
  amount: number;
  wagetypes: WageType[];
  id: string;
}

interface Payment {
  date: string;
  from: string;
  id: string;
  to: string;
  buckets: Bucket[];
}


interface BucketDescription {
  id: string;
  label: string;
}


export interface PayStub {
  buckets: BucketDescription[];
  payments: Payment[];
}

class PayStubWrapper {
  stub: PayStub;

  constructor(stub: PayStub) {
    this.stub = stub;
  }

  private getLatest() {
    return this.stub.payments[this.stub.payments.length -1];
  }

  private getBucketByLabel(label: string, payment: Payment) {

    const id = this.stub.buckets.find(b => b.label === label)?.id;
    const bucket = payment.buckets.find(b => b.id === id);

    if (!bucket) {
      throw new Error("Unable to get bucket");
    }

    return bucket;
  }

  private getWageTypeByLabel(label: string, bucket: Bucket) {
    const wage = bucket.wagetypes.find(w => w.label === label);
    if (! wage) {
      throw new Error (`Unable to get wagetype: ${label}`)
    }

    return wage;

  }

  getGrossPay() {
    const latest = this.getLatest();
    const bucket = this.getBucketByLabel('Earnings', latest);

    return bucket.amount;
  }

  getNetPay() {
    const latest = this.getLatest();

    const netBucket = this.getBucketByLabel("Net Pay", latest);

    return netBucket.amount;

  }

  getPreTax() {
    return this.getBucketByLabel('EE Benefits Pre-tax Deductions', this.getLatest());
  }

  getHSA() {
    const preTax = this.getPreTax();

    const label = '*HEALTH SAVINGS ACCT';
    
    const wage = this.getWageTypeByLabel(label, preTax);

    return wage.amount;

  }

  getHealth() {
    const preTax = this.getPreTax();

    const label = '*HEALTH CARE';
    
    const wage = this.getWageTypeByLabel(label, preTax);

    return wage.amount;

  }

  getRetirement() {

    const preTax = this.getPreTax();

    const label = '*RSP PRE-TAX BASIC';
    
    const wage = this.getWageTypeByLabel(label, preTax);

    return wage.amount;

  }

  getTaxes() {
    const latest = this.getLatest();

    const bucket = this.getBucketByLabel("EE Taxes", latest);

    return bucket.amount;

  }
}

export { PayStubWrapper } 
