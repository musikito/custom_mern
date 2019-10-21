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
    useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("Connection to MongoDB successfully");

});




// start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});