const express=require('express')
const router= express.Router()
const auth=require('../../middleware/auth')
const User = require('../../models/User')
const {check,validationResult} =require('express-validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')
const upload = require('../../middleware/upload')
const mongoose=require('mongoose')
// const upload=require('../../middleware/upload')
// const { GridFsStorage } = require('multer-gridfs-storage')


//@route  GET api/auth
//@desc   test route 
//@access Public
router.get('/',auth,async (req,res)=>{
    try {
        const user=await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('server error')
    }
})



//@route  POST api/auth
//@desc   Authenticate user & get token
//@access Public
router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password','Password is required').exists()
], async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body
    try {
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({errors:[{msg:'Invalid credentials'}]})
        }

        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({errors:[{msg:'Invalid credentials'}]})
        }


        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,
             config.get('jwtSecret'),
             {expiresIn:36000},
             (err,token)=>{
                 if (err) throw err;
                 res.json({token})
             } )
        

        
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }


    
})



//Avatar
conn.once('open',()=>{
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
}) 
//modify avatar
router.post('/avatarUpdate',[auth,upload.single('file')],(req,res)=>{
    if(req.files===null){
        return res.status(400).json({msg:'no files uploaded'})
    }
    
    console.log(req.file)
    return res.send(req.file)
    
})

//get avatar
router.get('/avatar/:fileid/:filename',async(req,res)=>{
    try {
    let file=await gridFSBucket.find({filename:req.params.filename}).toArray()
    if(file.length>1){
        for(let i=0;i<file.length-1;i++){
        await gridFSBucket.delete(file[i]._id)
    }
    }
    file=await gridFSBucket.find({_id:mongoose.Types.ObjectId(req.params.fileid)}).toArray()
    if(file.length!==0){
    await gridFSBucket.openDownloadStreamByName(req.params.filename).pipe(res)
    }else{
    await gridFSBucket.openDownloadStream(mongoose.Types.ObjectId("61b4ccf3b8d783415c0cf0c8")).pipe(res)
    }
    } catch (error) {
        res.status(500).send('Server error')
        console.log(error.message)
    }
})
module.exports=router