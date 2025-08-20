const express =require('express');
const app =express();
const morgan =require('morgan');
const cors=require('cors');
const dotenv = require('dotenv');
const connectDB =require('./config/db')
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// require('./1FoodYoutube/routes')(app);
require('./2BlogPost/routes')(app)


app.get('/',(req,res)=>{
    return res.status(200).send("<h1>Hello , Welcome to Food Servers</h1>")
})

const PORT = process.env.PORT;
 app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
 })