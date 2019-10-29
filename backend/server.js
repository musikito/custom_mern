const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const mongoUri = process.env.ATLAS_URI;
mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    reconnectTries: 30,
    reconnectInterval: 500, // in ms
    
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(Error, err.message);
});


const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("Connection to MongoDB successfully");
});


// Routes
const expensesRouter = require('./routes/expenses');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const currencyRouter = require('./routes/currencies');

app.use('/expenses', expensesRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/currencies',currencyRouter);

// start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});