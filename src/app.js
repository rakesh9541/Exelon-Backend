const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const fileRoutes = require('./routes/fileRoutes');
const app = express();

connectDB();
app.use(express.json());
app.use('/api', fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
