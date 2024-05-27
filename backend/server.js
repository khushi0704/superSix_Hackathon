const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS middleware
app.use(cors());

// Set up multer for handling file uploads 
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Array to store parsed CSV data
let csvData = [];

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  try {
      const { file } = req;
      if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
      }

      // Clear previous CSV data
      csvData = [];

      // Process the uploaded CSV file
      fs.createReadStream(file.path)
          .pipe(csv())
          .on('data', (row) => {
              // Parse creditLines and creditScore to integers
              row.CreditLines = parseInt(row.CreditLines);
              row.CreditScore = parseInt(row.CreditScore);

              // Calculate subscription price for the row
              const BasePrice = 100;
              const PricePerCreditLine = 100;
              const PricePerCreditScorePoint = 100;
              const SubscriptionPrice = BasePrice + (PricePerCreditLine * row.CreditLines) + (PricePerCreditScorePoint * row.CreditScore);

              // Add the subscription price to the row
              row.SubscriptionPrice = SubscriptionPrice;

              // Push the row to the csvData array
              csvData.push(row);
          })
          .on('end', () => {
              res.status(200).json({ message: 'File uploaded successfully', data: csvData });
          })
          .on('error', (error) => {
              console.error('Error processing CSV file:', error);
              res.status(500).json({ error: 'Failed to process CSV file' });
          });
  } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Failed to upload file' });
  }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });