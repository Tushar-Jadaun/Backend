<!-- ----------------------------------------------------    index.js (file)                 ---------------------------------------------------------------------------------------- -->
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for frontend to access backend
app.use(cors());

app.get('/interest', (req, res) => {
    const principle = parseFloat(req.query.principle);
    const rate = parseFloat(req.query.rate);
    const time = parseFloat(req.query.time);

    if (isNaN(principle) || isNaN(rate) || isNaN(time)) {
        return res.status(400).send({ error: 'Invalid input' });
    }

    const interest = (principle * rate * time) / 100;
    const total = principle + interest;

    res.send({
        Interest: interest,
        Total: total
    });
});

app.listen(3000, () => {
    console.log("✅ Server running at http://localhost:3000");
});
