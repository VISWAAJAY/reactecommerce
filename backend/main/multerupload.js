const multer = require('multer');

const express = require('express');
const router = express.Router();
//DIRECTORY NAME
__basedir = __dirname
var storage = multer.diskStorage({
    destination: (req , file , cb)=>{
        cb(null , '../backend/main/uploads/')
    },
    filename: (req, file, cb) => {
        
        cb(null, file.originalname);
    }
})
//STORING
var upload = multer({storage:storage});

router.post('/api/uploadFile',upload.single('productImage'),function(req,res){
    console.log(req.file.filename);
    res.json({data:req.file.filename})
})

//FOR DOWNLOAD
const download = (req,res)=>{
    var file = req.params.filename
    var path = __basedir + '/uploads/';
    console.log(path)
    console.log(file)
    console.log(path+file);
    res.download(path+file,(err)=>{
            if(err){
                res.status(500).json({error:"unable to download" + err})
            }

    })
}

router.get('/api/files/:filename' , download)
module.exports = router;