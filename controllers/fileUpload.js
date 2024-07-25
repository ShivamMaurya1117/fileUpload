const File = require('../models/File');
const cloudinary = require("cloudinary").v2;

//localfileupload -> handler functions
exports.localFileUpload = async(req, res) => {
    try {
        
      const file = req.files.file;
      let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
      file.mv(path, (err) => {
        console.log(err);
      });
      res.json({
        success: true,
        message:"File Uploaded Successfully", 
      })


    } catch (error) {
        console.log(error);
    }
}


//image upload 
function isFileSuppported(type, supportType){
  return supportType.includes(type);
}

async function uploadFileToCloudinary(file , folder,quality){
  const options = {folder};
  if(quality){
    options.quality = quality; 
  }
  //for video or big image file
  options.resource_type = "auto";
   return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async(req, res) => {
  try {
    //data fetch
    const{name, tags, email} = req.body;
    
    const file = req.files.imageFile;

    //Validation
    const supportType = ["jpg","png","jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();
    
    //if file is not supported
    if(!isFileSuppported(fileType, supportType)){
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      })
    }

   //file format supported 
   const response = await uploadFileToCloudinary(file,  "dataStorage");
  
   //save entry in database
   const fileData = await File.create({
    name,
    email,
    tags, 
    imageUrl: response.secure_url,
   })

   res.json({
    success: true,
    imageUrl: response.secure_url,
    message : "Image uploaded Successfully",
   })

  } catch (error) {
   console.error(error);
   res.status(400).json({
    success: false,
    message: "Something went wrong",
   }) 
  }
}


//----------------------videoUpload------------------------------------------

exports.videoUpload = async(req, res) => {
  try {
    //data fetch
     const{name, tags, email} = req.body;

     const file = req.files.videoFile;
     console.log(file);

     //validation
     const supportType = ["mov","mp4"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log(fileType);
    
    //if file is not supported
    if(!isFileSuppported(fileType, supportType)){
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      })
    }

     //file format supported 
   const response = await uploadFileToCloudinary(file,  "dataStorage");
  
   //save entry in database
   const fileData = await File.create({
    name,
    email,
    tags, 
    imageUrl: response.secure_url,
   });

   res.json({
    success: true,
    imageUrl: response.secure_url,
    message : "Video uploaded Successfully",
   })
     


  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: true,
      message: "Something went wrong cant upload the video",
    })
  }
}


//----------------------Image Size Reducer----------------------------
exports.imageSizeReducer = async(req, res) => {
  try {
     //data fetch
     const{name, tags, email} = req.body;
    
     const file = req.files.imageFile;
 
     //Validation
     const supportType = ["jpg","png","jpeg"];
     const fileType = file.name.split(".")[1].toLowerCase();
     
     //if file is not supported, add limit of limit mb of file
     if(!isFileSuppported(fileType, supportType)){
       return res.status(400).json({
         success: false,
         message: "file format not supported",
       })
     }
 
    //file format supported 
    const response = await uploadFileToCloudinary(file,  "dataStorage", 50);
   
    //save entry in database
    const fileData = await File.create({
     name,
     email,
     tags, 
     imageUrl: response.secure_url,
    })
 
    res.json({
     success: true,
     imageUrl: response.secure_url,
     message : "Image uploaded Successfully",
    })

  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong!",
    })
  }
}