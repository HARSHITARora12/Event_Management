const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'waheguru12$A',
  database: 'userdb',
  port: 3306,
  connectionLimit: 10 
});


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

app.post('/connect.php', (req, res) => {
  const { salutation, firstname, lastname, gender, Address1, Address2, City, Region, Postalcode } = req.body;

  const sql = 'INSERT INTO users (salutation, firstname, lastname, gender, Address1, Address2, City, Region, Postalcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [salutation, firstname, lastname, gender, Address1, Address2, City, Region, Postalcode], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    res.send('Registration successful!');
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
