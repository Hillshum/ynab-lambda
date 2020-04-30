import { Handler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as api from './api'
import { parse } from './csv';
import { SaveTransactionsResponse } from 'ynab';


require('portable-fetch');

const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {

  if (! event.body) {
    throw new Error("Missing POSTBODY");
  }

  const csvTransactions = parse(event.body);

  const existingTransactions = await api.loadTransactions();
  console.log(existingTransactions);

  const existingIds = new Set(existingTransactions.map(({import_id})=>import_id));

  const toUpload = csvTransactions.filter(({ImportId})=>!existingIds.has(ImportId))

  let result: SaveTransactionsResponse | null = null;

  if (toUpload.length) {
    result = await api.postTransactions(toUpload);
  }
    
  const response = {
    statusCode: 200,
    body: JSON.stringify(result)
  }

  return response;
}

export { handler}