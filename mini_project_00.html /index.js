
<!-- -- ---------------     -----------------------  calculate.html (file for html)      -----------------------------           ---------------------          -- -->
<!DOCTYPE html>
<html>
<head>
  <title>Interest Calculator</title>
  <style>
    .box {
      width: 200px;
      height: 150px;
      background-color: #4CAF50;
      border: 2px solid black;
      border-radius: 10px;
      margin: 50px auto;
      text-align: center;
      line-height: 150px;
      color: white;
      font-size: 20px;
    }
  </style>
</head>
<body>

  <input id="principle" type="text" placeholder="Enter the principle"><br><br>
  <input id="rate" type="text" placeholder="Enter the rate"><br><br>
  <input id="time" type="text" placeholder="Enter the time"><br><br>
  <button onclick="calculateInterest()">Submit</button>

  <h1 class="box" id="ans"></h1>

  <script>
    function calculateInterest() {
  const principle = document.getElementById("principle").value;
  const rate = document.getElementById("rate").value;
  const time = document.getElementById("time").value;

  fetch(`http://localhost:3000/interest?principle=${principle}&rate=${rate}&time=${time}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Server responded with " + response.status);
      }
      return response.json();
    })
    .then(ans => {
      document.getElementById("ans").innerText = `Interest: ${ans.Interest}\nTotal: ${ans.Total}`;
    })
    .catch(error => {
      document.getElementById("ans").innerText = "Error fetching result";
      console.error("Fetch error:", error);  
    });
}

  </script>

</body>
</html>


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
