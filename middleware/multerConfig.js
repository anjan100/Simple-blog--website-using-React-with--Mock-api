const multer =require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cd(null,'./storage')

    }
})

module.exports ={multer,storage}