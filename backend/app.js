const express = require('express')
const btoa = require('btoa');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request-promise');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/generate-payment-id', (req, res) => {

    const options = {
        method: 'POST',
        uri: 'https://api.razorpay.com/v1/orders',
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(process.env.RAZORPAY_KEY + ':' + process.env.RAZORPAY_SECRETKEY)
        }
    }
    request(options).then(function (response) {
        console.log(response);
        res.status(200).json(response);
    }).catch(function (err) {
        console.log(err);
    });

});

app.post('/verify-payment', (req, res) => {

    console.log(req.body)
    let result = {
        'response': ''
    };

    const crypto = require('crypto')
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRETKEY)
    shasum.update(req.body['razorpay_order_id'] + '|' + req.body['razorpay_payment_id'])
    const digest = shasum.digest('hex')

    if (digest === req.body['razorpay_signature']) {
        console.log("Veritication Success")
        result['response'] = req.body['razorpay_signature']
    } else {
        console.log("Veritication Failed")
        result['response'] = req.body['razorpay_signature'].substring(0, 9) + 'aa42hj3u' + req.body['razorpay_signature'].substring(9);
    }
    console.log("res: " + result);
    res.status(200).json(result)
});

app.get('/', (req, res) => res.send("KalaKart Shop running"));

app.listen(port, (req, res) => {
    console.log(`Hello world app listening on port ${port}!`)
});