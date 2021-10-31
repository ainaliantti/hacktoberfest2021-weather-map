const express = require('express');
const app = express();
const mock_json_data = require('./mock_data.json');
// require('dotenv').config();
// const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.get('/api/cities/', (request, response) => {
    response.json(mock_json_data);
});

app.get('/api/cities/:city', (request, response) => {
    // TODO
    const city = request.params.city;
    response.status(404).send();
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
