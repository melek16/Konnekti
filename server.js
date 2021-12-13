const express = require('express')
const connectDB=require('./config/db')
const Grid=require('gridfs-stream')
const mongoose=require('mongoose')
const upload=require('./middleware/upload')
const auth=require('./middleware/auth')
const app= express()

let gridFSBucket;
connectDB();

module.exports= conn=mongoose.connection




app.use(express.json({extended:false}))

app.get('/', (req,res)=>res.send("Running"))

//define Routes
app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/post',require('./routes/api/post'))


const PORT=process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`server started on port ${PORT}`))