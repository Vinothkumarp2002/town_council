const multer =require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname )
//     }
//   })
  
//   const upload = multer({ storage })

// //   const upload = multer({ dest: 'uploads/' })


//   module.exports ={
//     upload
//   }


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = {
  upload
}

