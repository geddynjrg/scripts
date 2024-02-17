const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000; // Change this to the desired port number (8000 in this example)

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

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

// API Endpoint to Save Exam Data
app.post('/saveExam', (req, res) => {
  console.log(req.body);
  const { question, answer, keywords, marks, image } = req.body;

  // Convert the base64-encoded image data to a Buffer
  const imageBuffer = Buffer.from(image, 'base64');

  // Convert the image Buffer to a base64 string
  const base64Image = imageBuffer.toString('base64');

  // Create SQL query to insert data into the tbl_questions table
  const sqlQuery = 'INSERT INTO tbl_questions (Question, Answer, KeyWords, Marks, image) VALUES (?, ?, ?, ?, ?)';

  // Execute the query with data from the request body
  pool.query(sqlQuery, [question, answer, keywords, marks, base64Image], (error, results, fields) => {
    if (error) {
      console.error('Error saving exam data:', error);
      res.status(500).json({ error: 'Error saving exam data' });
    } else {
      console.log('Exam data saved successfully:', results);
      res.status(200).json({ message: 'Exam data saved successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
