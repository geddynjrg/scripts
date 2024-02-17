const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 9000; // Change this to the desired port number (8000 in this example)

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

app.post('/getExamData', (req, res) => {
  // Extract data from tbl_questions
  const sqlExtract = 'SELECT * FROM tbl_questions ORDER BY RAND ()';

  // Execute the query with data from the request body
  pool.query(sqlExtract, (error, results, fields) => {
    if (error) {
      console.error('Error extracting exam data:', error);
      res.status(500).json({ error: 'Error extracting exam data' });
    } else {
      // Convert images from buffer to base64 before sending the response
      results.forEach((row) => {
        if (row.image) {
          row.image = row.image.toString('base64');
        }
      });

      console.log('Exam data extracted successfully:', results);
      res.status(200).json({ results });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
