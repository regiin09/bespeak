const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");
const hbs = require("hbs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'R&sM^9h9RxXq3%',
  database: 'users'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database.');
  }
});
const login_id="";
const location = path.join(__dirname, "./html_css");
app.use(express.static(location));
app.set("view engine", "hbs");
app.get("/", (req, res) => {
  res.render("index");
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query1 = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(query1, [username, password], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Server error');
    } else if (results.length > 0) {
      const loginId = results[0].username;
      res.redirect(`/booking?loginId=${loginId}`);
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
  console.log("Received request payload:", req.body);
});

app.post("/signup", (req, res) => {
  const { name, username, password } = req.body;
  connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Server error 1');
    } else if (results.length > 0) {
      res.status(409).send('User already exists');
    } else {
      connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send('Server error 2');
        } else {
          res.status(201).send('User created');
        }
      });
    }
  });
});

app.get('/booking', (req, res) => {
  const { loginId } = req.query;
  res.render('booking', { loginId });
});

app.post('/booking', (req, res) => {
  const { loginId, eventId } = req.body;
  res.redirect(`/save-seats?loginId=${loginId}&eventId=${eventId}`);
});

app.get('/930amenth', (req, res) => {
  const { loginId, eventId } = req.query;
  res.render('930amenth', { loginId, eventId });
});

app.get('/save-seats', (req, res) => {
  const { loginId, eventId } = req.query;
  res.render('save-seats', { loginId, eventId });
});

app.post('/save-seats', (req, res) => {
  const { loginId, eventId, selectedSeats } = req.body;

  const tableName = 'ticket';

  const ticket_1 = selectedSeats[0] || '';
  const ticket_2 = selectedSeats[1] || '';
  const ticket_3 = selectedSeats[2] || '';

  const insertQuery = 'INSERT INTO ticket (cust_name, ticket_1, ticket_2, ticket_3, event_id) VALUES (?, ?, ?, ?, ?)';
  connection.query(insertQuery, [loginId, ticket_1, ticket_2, ticket_3, eventId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to save selected seats' });
    } else {
      res.json({ message: 'Selected seats saved successfully' });
    }
  });
});
app.get('/print', (req, res) => {
  const { loginId, eventId } = req.query;
  res.render('print', { loginId, eventId });
});





app.post('/cancellation', (req, res) => {
  const { ticket } = req.body;
  connection.query('DELETE FROM ticket WHERE ticket = ?', [ticket], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Server error 3');
    } else {
      res.status(201).send('Ticket cancelled');
    }
  });
});



app.listen(3000, () => console.log('Server running on port 3000'));
