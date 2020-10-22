const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const todoRouter = require('./routes/todos.router');
const { errorHandler }  = require("./middleware/errorHandler");

const PORT = 5000;
const app = express();
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(
    express.urlencoded({
      extended: true,
    })
);
app.use(express.json()); 


app.use('/api/todos', todoRouter); 
app.use(errorHandler)

app.listen(PORT, () => console.log('Server is running'));
