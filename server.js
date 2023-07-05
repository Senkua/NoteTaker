const express = require('express');
const path = require('path');
const fs = require('fs');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// API routes
apiRoutes(app);

// HTML routes
htmlRoutes(app);

// Start server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));