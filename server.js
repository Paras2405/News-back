const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to fetch news
app.get('/api/news', async (req, res) => {
  const { category,country} = req.query; // Accept category and country as query params
  const API_KEY = process.env.NEWS_API_KEY;

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines`,
      {
        params: {
          apiKey: API_KEY,
          category: category || 'general',
          country: country || 'us', 
        },
      }
    );
    res.status(200).json(response.data); // Send the NewsAPI response to the client
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
