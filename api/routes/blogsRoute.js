const express = require("express")
const { 
    getAllBlogsController, 
    createBlogController, 
    updateBlogController, 
    getBlogByIdController, 
    deleteBlogController, 
    userBlogController
} = require("../control/blogsController")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })




// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../client/src/uploads/')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() 
//       cb(null, uniqueSuffix + file.originalname)
//     }
//   })
  
//   const upload = multer({ storage: storage })
// const uploadMiddleware = multer({dest: './uploads/'})

const router = express.Router()

router.get("/all-blogs", getAllBlogsController)
router.post("/create-blog",upload.single('image') , createBlogController)

router.put("/update-blog/:id", updateBlogController)

//Get single blog
router.get("/get-blog/:id", getBlogByIdController)


router.delete("/delete-blog/:id", deleteBlogController)

router.get("/user-blog/:id", userBlogController)
module.exports = router
