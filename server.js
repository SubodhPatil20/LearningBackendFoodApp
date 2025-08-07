const express =require('express');
const app =express();
const morgan =require('morgan');
const cors=require('cors');
const dotenv = require('dotenv');
const mongoose =require("mongoose");
const {configs } = require('./config/db');
const connectDB =require('./config/db')
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1/test",require("./routes/testRoutes"));
app.use("/api/v1/auth",require('./routes/authRoutes'));
app.use("/api/v1/user",require("./routes/userRoutes"))

app.get('/',(req,res)=>{
    return res.status(200).send("<h1>Hello , Welcome to Food Servers</h1>")
})

const PORT = process.env.PORT;
 app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
 })