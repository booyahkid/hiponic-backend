const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const passwordResetRoutes = require('./routes/passwordResetRoutes');
const landRoutes = require('./routes/landRoutes');
const plantRoutes = require('./routes/plantRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/password', passwordResetRoutes);
app.use('/lands', landRoutes);
app.use('/plants', plantRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
