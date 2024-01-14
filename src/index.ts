import express from 'express';
import bodyParser from 'body-parser';
import { handler as venmo } from './functions/venmo';
import paystubHandler from './functions/paystub';

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.text())

// Venmo endpoint
// app.post('/venmo', venmo);

// Paystub endpoint
app.post('/paystub', (req, res, next)=> {
    const stub = req.body;
    console.log(stub)
    paystubHandler(stub).then(()=>res.sendStatus(200))
    .catch(()=>{
        console.log('cauthg error in paystub handler')
        res.sendStatus(500)
        // next();
    });
} );

app.listen(port, () => {
    console.log('Server is running on port 3000');
});


process.on('unhandledRejection', function (err:any) {
    console.log('caught unhandled rejection')
    console.log(err);
})
// export { paystub, venmo}