const { upload } = require("../database/imageMulter")

const express = require("express");

const router = express.Router()

const cloudinary = require('cloudinary').v2;

require('dotenv').config();

const moment = require('moment-timezone');

cloudinary.config({
    cloud_name: 'dazu9xk1t',
    api_key: '349657169983752',
    api_secret: 'oRPTnY09uZvwiCMf6brhzdriBVc'
  });

// router.post('/upload', upload.array('photos', 10), async (req, res) => {

//     try {
//         const data = [...req.files];
//         const times = Array.isArray(req.body.time) ? req.body.time : [req.body.time];

//         const dateStringArray = times.map(time => new Date(Number(time)).toLocaleString("en-US", {
//             timeZone: 'Asia/Kolkata' // Specify UTC for consistency
//         }));

//         if (req.files) {
//             const updatedData = data.map((file, index) => {
//                 return {
//                     ...file,
//                     "time": dateStringArray[index]
//                 };
//             });
//             // console.log(updatedData)

//             res.json({
//                 status: 200,
//                 message: "Image Uploaded",
//                 data: updatedData
//             });
//         }
//     }
//     catch (err) {
//         console.log(err)
//         return res.status(500).json({
//             success: 0,
//             message: "Image Upload Error!"
//         })
//     }
// });

// module.exports = router



router.post('/upload', upload.array('photos'), async (req, res) => {
    try {
      const uploadedImages = [];
  
      const times = Array.isArray(req.body.time) ? req.body.time : [req.body.time];
  
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const time = times[i];

        const formattedTime = moment.unix(time).tz('Asia/Kolkata').format('LL LTS');

        try {
          const base64String = file.buffer.toString('base64');
  
          const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${base64String}`, {
            resource_type: 'auto'
          });
  
          uploadedImages.push({
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            url: result.secure_url,
            time: formattedTime 
          });
        } catch (uploadError) {
          return res.status(500).json({ success: 0, error: 'Error uploading image to Cloudinary', uploadError });
        }
      }
  
      res.json({ success: 1,message: "Image Uploaded", data: uploadedImages});
    } catch (error) {
      res.status(500).json({ success: 0, error: 'Internal Server Error' });
    }
  });

  module.exports = router