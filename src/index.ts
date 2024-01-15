import express from 'express';
import bodyParser from 'body-parser';
import paystubHandler from './functions/paystub';

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.text())


// Paystub endpoint
app.post('/paystub', (req, res, next)=> {
    const stub = req.body;
    console.log(stub)
    paystubHandler(stub).then(()=>res.sendStatus(200))
    .catch(next);
} );

app.listen(port, () => {
    console.log('Server is running on port 3000');
});


process.on('unhandledRejection', function (err:any) {
    console.log('caught unhandled rejection')
    console.log(err);
})