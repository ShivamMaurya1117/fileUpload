//app creation
const express = require('express');
const app = express();

//port define

require('dotenv').config();
const PORT = process.env.PORT || 3000; 

//middleware
app.use(express.json()); 
const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//Db connect
const db = require('./config/database');
db.connect();

//cloud connect
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

//api mount 
const Upload = require('./routes/FileUpload');
app.use("/api/v1/upload", Upload);

//activate server
app.listen(PORT, () => {
    console.log(`Port is running at ${PORT}`);
})