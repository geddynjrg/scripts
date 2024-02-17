const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000; 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Details
const dbConfig = {
  host: 'localhost',
  user: 'exam',
  password: 'E%am@2023',
  database: 'db_register',
  port: 3360,
};

// Create MySQL Connection Pool
const pool = mysql.createPool(dbConfig);

app.post('/login', (req, res) => {
  //extract data from tbl_signin
  const sqlExtract = 'SELECT * FROM db_register.tbl_signin WHERE names LIKE ? AND stud_no=? LIMIT 1';
  const values = ["%" + req.body.names + "%", req.body.password];

  console.log(values);

  // Execute the query with data from the request body
  pool.query(sqlExtract, values, (error, results, fields) => {
    if (error) {
      console.error('Error extracting Log in details:', error);
      res.status(500).json({ error: 'Error extracting log in data' });
    } else {
      console.log('Log in details found:', results);
      res.status(200).json({results});
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
