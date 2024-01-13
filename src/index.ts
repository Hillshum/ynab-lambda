import express from 'express';
import { handler as venmo } from './functions/venmo';
import paystubHandler from './functions/paystub';

import lambdaWrapper from './utils/lambda-wrapper';
const paystub = lambdaWrapper(paystubHandler)
const port = process.env.PORT || 3000;

const app = express();

// Venmo endpoint
app.post('/venmo', venmo);

// Paystub endpoint
app.post('/paystub', paystub );

app.listen(port, () => {
    console.log('Server is running on port 3000');
});

export { paystub, venmo}