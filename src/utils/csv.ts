import Papa from 'papaparse'

export interface Transaction { 
  Date: string,
  Payee: string,
  Amount: number,
  Memo: string,
  ImportId: string,
}

const getPayee = (payment: any) => {
  if (payment.Type === 'Payment') {
    return payment['Amount (total)'].includes('-') ? payment.To : payment.From;
  }
  
  return payment['Amount (total)'].includes('+') ? payment.To : payment.From;
}

export const parse = (input: string): Transaction[] => {

  // TODO: Error check this
  const {data} = Papa.parse(input, {header: true})
  const rawTransactions = data.slice(1, data.length - 4)

  const transactions = rawTransactions.filter(transaction=>{
    if ( transaction['Destination'] === 'Venmo balance'
        || transaction['Funding Source'] === 'Venmo balance') {
      return true;
    }

    return false;
  }).map(payment=> ({
    Date: payment.Datetime.substring(0, 10),
    Payee: getPayee(payment),
    Amount: Number(payment['Amount (total)'].replace('$', '').replace(' ', '')),
    Memo: payment.Note,
    ImportId: payment.ID,
  }))


  return transactions;


}

export const unparse = (transactions:Transaction[]) => Papa.unparse(transactions)