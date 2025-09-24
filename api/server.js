const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);
app.use('/', routes); 
app.use(express.static(path.join(__dirname, 'web')));
app.listen(3000, () => {
    console.log('API respondendo em http://localhost:3000')
});