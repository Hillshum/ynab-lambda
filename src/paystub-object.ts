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
    return this.stub.payments[this.stub.payments.length - 1];
  }

  private getBucketByLabel(label: string, payment: Payment) {
    const id = this.stub.buckets.find((b) => b.label === label)?.id;
    const bucket = payment.buckets.find((b) => b.id === id);

    if (!bucket) {
      throw new Error('Unable to get bucket');
    }

    return bucket;
  }

  private getWageTypeByLabel(label: string, bucket: Bucket) {
    const wage = bucket.wagetypes.find((w) => w.label === label);
    if (!wage) {
      throw new Error(`Unable to get wagetype: ${label}`);
    }

    return wage;
  }

  getGrossPay(): number {
    const latest = this.getLatest();
    const bucket = this.getBucketByLabel('Earnings', latest);

    return bucket.amount;
  }

  getNetPay(): number {
    const latest = this.getLatest();

    const netBucket = this.getBucketByLabel('Net Pay', latest);

    return netBucket.amount;
  }

  getPreTax(): Bucket {
    return this.getBucketByLabel(
      'EE Benefits Pre-tax Deductions',
      this.getLatest(),
    );
  }

  getHSA(): number {
    const preTax = this.getPreTax();

    const label = '*HEALTH SAVINGS ACCT';

    const wage = this.getWageTypeByLabel(label, preTax);

    return wage.amount;
  }

  getHealth(): number {
    const preTax = this.getPreTax();

    const label = '*HEALTH CARE';

    const wage = this.getWageTypeByLabel(label, preTax);

    return wage.amount;
  }

  getRetirement(): number {
    const preTax = this.getPreTax();

    const label = '*RSP PRE-TAX BASIC';

    const wage = this.getWageTypeByLabel(label, preTax);

    return wage.amount;
  }

  getTaxes(): number {
    const latest = this.getLatest();

    const bucket = this.getBucketByLabel('EE Taxes', latest);

    return bucket.amount;
  }

  getEmployerContributions(): number {
    const latest = this.getLatest();
    const bucket = this.getBucketByLabel('Employer Contributions', latest);

    return bucket.amount;
  }

  getMedicare(): number {
    const taxes = this.getBucketByLabel('EE Taxes', this.getLatest());

    const medicare = this.getWageTypeByLabel('TX EE Medicare Tax Federal', taxes);

    return medicare.amount
  }

  getSS(): number {

    const taxes = this.getBucketByLabel('EE Taxes', this.getLatest());
    const wage = this.getWageTypeByLabel('TX EE Social Security Tax Federal', taxes);

    return wage.amount;
  }

  getIncomeTaxes(): number {
    const taxes = this.getBucketByLabel('EE Taxes', this.getLatest());
    const wage = this.getWageTypeByLabel('TX Withholding Tax Federal', taxes);

    return wage.amount;

  }
}

export { PayStubWrapper };
