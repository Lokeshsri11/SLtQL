const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { parseNlp } = require('./nlp');
const { generateQuery } = require('./graphql');

const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Middleware for enabling CORS
app.use(cors());

// API endpoint for converting natural language text to a GraphQL query
app.post('/convert', (req, res) => {
    const { text } = req.body;
    const { queryType, args } = parseNlp(text);
    const query = generateQuery(queryType, args);
    res.json({ query });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
