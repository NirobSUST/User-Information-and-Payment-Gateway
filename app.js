// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Create a new Express application
const app = express();

// Configure the application to use body-parser middleware for parsing POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// Define a route to serve the login page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Login</title>
        <style>
          form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
          }
          input {
            margin: 10px;
          }
        </style>
      </head>
      <body>
        <form action="/submit" method="POST">
          <h1>Login</h1>
          <label for="username">Username:</label>
          <input type="text" id="username" name="username">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password">
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

// Define a route to handle POST requests to the login form
app.post('/submit', (req, res) => {
  const { username, password } = req.body;

  // Redirect the user to the information page with the username parameter in the URL
  const infoUrl = `/info?username=${encodeURIComponent(username)}`;
  res.redirect(infoUrl);
});

// Define a route to serve the information page
app.get('/info', (req, res) => {
  const username = req.query.username;

  res.send(`
    <html>
      <head>
        <title>Information</title>
        <style>
          form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
          }
          input {
            margin: 10px;
          }
        </style>
      </head>
      <body>
        <form action="/information" method="POST">
          <h1>Information</h1>
          <label for="data">Data:</label>
          <input type="text" id="data" name="data">
          <label for="validity">Validity:</label>
          <input type="text" id="validity" name="validity">
          <label for="cost">Cost:</label>
          <input type="text" id="cost" name="cost">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" value="${username}" readonly>
          <label for="ccnumber">Credit Card Number:</label>
          <input type="text" id="ccnumber" name="ccnumber">
          <label for="ccv">CCV:</label>
          <input type="text" id="ccv" name="ccv">
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

// Define a route to handle POST requests to the information form
// app.post('/submit-info', (req, res) => {
//   const { data, validity, cost, name, ccnumber, ccv } = req.body;

//   // Redirect the user to a success page
//   res.send(`<html> <head> <title>Success</title> </head> <body> <h1>Success!</h1> <p>Data: ${data}</p> <p>Validity: ${validity}</p> <p>Cost: ${cost}</p> <p>Name: ${name}</p> <p>Credit Card Number: ${ccnumber}</p> <p>CCV: ${ccv}</p> </body> </html>`);
// });

app.post('/information', (req, res) => {
  const { data, validity, cost, name, ccnumber, ccv } = req.body;

  // Create the query URL using the Credit Card Number, CCV, and Name fields
  const queryURL = `https://sandbox.sslcommerz.com/EasyCheckOut/testcde5dedf3d7f5a8ce382aa0e2aefc7bc831?card_number=${ccnumber}&card_cvv=${ccv}&card_name=${name}`;

  // Redirect the user to the query URL
  res.redirect(queryURL);
});

// ---------------------------------------------------------------------------------------------------




// ---------------------------------------------------------------------------

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
