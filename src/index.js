const express = require('express');
const Router = require('../src/server/routes');

require('dotenv').config();

const app = express();

//app.use(bodyParser.json());
app.use('/api', Router);


const PORT =process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});