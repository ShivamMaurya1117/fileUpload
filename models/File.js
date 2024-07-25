 const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

 const FileSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
      },
      tags: {
        type: String,
      },
      email: {
        type: String,
      }
 });


 //Post middleware
FileSchema.post("save", async function(doc){
  try {
      //database mai jo entry create hoti hai wahi hai "doc"

      //transporter
     let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
     });

     //send mail function
     let info = await transporter.sendMail({
       from: `Nigga Society`,
       to:  doc.email,
       subject: "New file uploaded.." ,
       html: `<h2>Hello!</h2> <p>File Uploaded View here : <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
     });

     



  } catch (error) {
    console.error(error);
  }
})



 const File =  mongoose.model("File", FileSchema);
 module.exports = File;