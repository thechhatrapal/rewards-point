
const express = require('express');
var cors = require('cors')
var app = express()
 
app.use(cors())
const PORT = 5000;
const transactions = require('./data/transactions.json');

app.get('/api/transactions', (req, res) => {
  // Simulate asynchronous API call with a promise
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 1000); // 1-second delay to simulate async call
  })
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ error: 'Failed to fetch transactions' }));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
