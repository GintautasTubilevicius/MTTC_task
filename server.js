const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/imei', (req, res) => {
    let imei = req.body.imei;

    function sumDig(n)
    {
        let a = 0;
        while (n > 0)
        {
            a = a + n % 10;
            n = parseInt(n / 10, 10);
        }
        return a;
    }

    function isValidIMEI(n) {

        // Converting the number into
        // String for finding length
        let s = n.toString();
        let len = s.length;

        if (len != 15)
            return false;

        let sum = 0;
        for (let i = len; i >= 1; i--) {
            let d = (n % 10);

            // Doubling every alternate digit
            if (i % 2 == 0)
                d = 2 * d;

            // Finding sum of the digits
            sum += sumDig(d);
            n = parseInt(n / 10, 10);
        }

        return (sum % 10 == 0);
    }

    res.json({ ImeiValidationResponse: {
        IMEINumber: imei,
        isValid: isValidIMEI(imei) ? true : false,
        Message: isValidIMEI(imei) ? 'IMEI is valid' : 'IMEI is not valid'
    }});

})

app.listen(3000, () => {
    console.log('Server listening on port 3000!')
})