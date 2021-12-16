const express=require('express')
const mongoose=require('mongoose')
const auth = require('../../middleware/auth')

const Post=require('../../models/Post')
const User=require('../../models/User')
const Profile=require('../../models/Profile')
const postupload = require('../../middleware/postupload')
const router= express.Router()


//@route POST api/post
//@desc  Create a post
//@access Private
router.post('/',auth,async (req,res)=>{
    try {
        const user= await User.findById(req.user.id).select('-password')
        const newPost=new Post({
            text:req.body.text,
            name:user.name,
            user:req.user.id
        })
        const post= await newPost.save()
        res.json(post)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})





//@route GET api/posts
//@desc  Get all posts
//@access Private
router.get('/',auth,async (req,res)=>{
        try {
            const posts=await Post.find({}).populate('user','avatar').sort({date:-1})
            res.json(posts)
        } catch (error) {
            console.log(error.message)
            res.status(500).send('Server error')
        }
})




//@route GET api/posts/:id
//@desc  Get post by id
//@access Private
router.get('/:id',auth,async (req,res)=>{
        try {
            const post=await Post.findById(req.params.id)
            if(!post){
                return res.status(404).json({msg:'post not found'})
            }
            res.json(post)
        } catch (error) {
            console.log(error.message)
            res.status(500).send('Server error')
        }
})


//@route DELETE api/posts/:id
//@desc  delete post by id
//@access Private
router.delete('/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg:'post not found'})
        }
        //check user
        if(post.user.toString()!==req.user.id){
            return res.status(401).json({msg:'user not authorized'})
        }

        await post.remove()
        return res.json({msg:'post removed'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})




//@route PUT api/post/like/:id
//@desc  like a post
//@access Private
router.put('/like/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        //check if user already liked by this user
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return res.status(400).json({msg:'post already liked'})
        }
        post.likes.unshift({user:req.user.id})
        await post.save()
        res.json(post.likes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})






//@route PUT api/post/unlike/:id
//@desc  unlike a post
//@access Private
router.put('/unlike/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        //check if user already liked by this user
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
            return res.status(400).json({msg:'post has not yet been liked'})
        }
        const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex,1)
        await post.save()
        res.json(post.likes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


//@route POST api/post/comment/:id
//@desc  Comment on a post
//@access Private
router.post('/comment/:id',auth,async (req,res)=>{
    try {
        const user= await User.findById(req.user.id).select('-password')
        const post=await Post.findById(req.params.id)
        const newComment={
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        }
        post.comments.unshift(newComment)
        await post.save()
        res.json(post.comments)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


//@route DELETE api/post/comment/:id/comment_id
//@desc  delete a comment
//@access Private
router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)

        //pull out comment
        const comment=post.comments.find(comment=>comment.id===req.params.comment_id)
        if(!comment){
            return res.status(404).json({msg:'comment not found'})
        }
        //check user 
        if(comment.user.toString()!==req.user.id){
            return res.status(401).json({msg:'user not authorized'})
        }
        const removeIndex=post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id)
        post.comments.splice(removeIndex,1)
        await post.save()
        res.json(post.comments)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


//Post photo
// conn.once('open',()=>{
//     gridFSBucket2 = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: 'postPhotos'
//     });
// }) 
//uploadPostPhoto
// router.post('/postPhoto',[auth,postupload.single('file')],(req,res)=>{
//     if(req.files===null){
//         return res.status(400).json({msg:'no files uploaded'})
//     }
    
//     console.log(req.file)
//     return res.send(req.file)
    
// })

// router.post('/postPhoto/:post_id',auth,async (req,res)=>{
//     try {
//         let post=await Post.findById(req.params.post_id)
//         post=await Post.findOneAndUpdate({_id:req.params.post_id},{$set:{avatar:req.body.avatar}},{new:true})


//         res.json(post)
        
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).send('Server error')
//     }

// })

//get postPhoto
// router.get('/postPhoto/:fileid',async(req,res)=>{
//     try {
//     let file=await gridFSBucket2.findById(req.params.fileid)
//     if(!file){
//         return res.status(404).json({msg:'file not found'})
//     }
//     await gridFSBucket2.openDownloadStream(req.params.fileid).pipe(res)
    
//     } catch (error) {
//         res.status(500).send('Server error')
//         console.log(error.message)
//     }
// })
module.exports=router