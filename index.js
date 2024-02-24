const express= require('express')
const adminRoutes=require('./routes/adminRoutes.js')
const userRoutes=require('./routes/userRoutes.js')
const connectDB=require('./config/db.js')
const dotenv=require('dotenv')
const bodyParser = require('body-parser');


dotenv.config()

const app = express()

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

app.use(bodyParser.json());


connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT,() => {
    console.log(`Server is running at port ${PORT}`)
})