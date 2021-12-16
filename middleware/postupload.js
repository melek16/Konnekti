const multer=require('multer')
const {GridFsStorage}=require('multer-gridfs-storage')
const config= require('config')
const db=config.get('mongoURI')

const postStorage=new GridFsStorage({
    url:db,
    file:(req,file)=>{
        const match=['image/png','image/jpeg']
        if(match.indexOf(file.mimetype)===-1){
            const filename=`${req.user.id}`
            return filename
        }
        return{
            bucketName:"postPhotos",
            filename:`${req.user.id}`,
        }
    }
})
 module.exports=multer({postStorage})