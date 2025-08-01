const express =require('express');
const app =express();
const morgan =require('morgan');
const cors=require('cors');
const dotenv = require('dotenv');
const mongoose =require("mongoose");
const {configs } = require('./config/db');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose
  .connect(configs.DBConnection)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...");
    console.error(err);
    process.exit();
  });
app.use("/api/v1/test",require("./routes/testRoutes"));

app.get('/',(req,res)=>{
    return res.status(200).send("<h1>Hello , Welcome to Food Servers</h1>")
})

const PORT = process.env.PORT;
 app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
 })