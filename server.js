// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Define  schema and model
const TestSchema = new mongoose.Schema({
    message: String
});
const Test = mongoose.model('test', TestSchema, 'test');

// Define routes
app.get('/test', async (req, res) => {
    try {
        const testData = await Test.find({});
        res.json(testData);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
