const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 9001; // Change this to the desired port number (8000 in this example)

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Details
const dbConfig = {
  host: 'localhost',
  user: 'exam',
  password: 'E%am@2023',
  database: 'db_student',
  port: 3360,
};

// Create MySQL Connection Pool
const pool = mysql.createPool(dbConfig);

app.post('/getTotalMarks', (req, res) => {
  //extract data from tbl_questions
  const sqlExtract2 = 'SELECT SUM(Marks) AS TotalMarks FROM db_student.tbl_questions';

  pool.query(sqlExtract2, (error2, results2, fields2) => {
    console.log(results2[0].TotalMarks);
    res.status(200).json({results2});
  });

});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
