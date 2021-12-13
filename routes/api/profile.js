const express=require('express')
const router= express.Router()
const auth=require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User=require('../../models/User')
const {check,validationResult} =require('express-validator')
const mongoose=require('mongoose')

//@route   GET api/profile/me
//@desc    Get current user's profile
//@access  Private
router.get('/me',auth,async (req,res)=>{
    try {
        let profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
        if(!profile){
            // return res.status(400).json({msg: 'There is no profile for this user'})
            const user=await User.findOne({_id:req.user.id}).select({name:1,avatar:1})
            profile={user}
        }
        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


//@route   POST api/profile
//@desc    Create or update a user profile
//@access  Private
router.post('/',[auth,[check('from').notEmpty(),check('birthdate').notEmpty()]],async (req,res)=>{
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {bio,location,from,birthdate,creationDate,experience,education}=req.body
    const profileFields={}
    profileFields.user=req.user.id
    if (bio) profileFields.bio=bio
    if (location) profileFields.location=location
    if (from) profileFields.from=from
    if (birthdate) profileFields.birthdate=birthdate 
    if (creationDate) profileFields.creationDate=creationDate
    profileFields.education=education
    profileFields.experience=experience

    try {
        let profile= await Profile.findOne({user:req.user.id})
        if(profile){
            //update
            profile=await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
            return res.json(profile)
        }
        //create
        profile= new Profile(profileFields)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})


//@route   GET api/profile
//@desc    get all profiles
//@access  Public
router.get('/',async(req,res)=>{
    try {
        let profiles=await Profile.find({}).populate('user',['name','avatar'])
        const users= await User.find({}).select({name:1,avatar:1})
        const users_with_profile=profiles.map(profile=>profile.user.id)
        profiles=[...profiles,...users.map(user=>!users_with_profile.includes(user._id.str)?{user}:null)]
        res.json(profiles)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


//@route   GET api/profile/user/:user_id
//@desc    get profile by user id
//@access  Public
router.get('/user/:user_id',async(req,res)=>{
    try {
        let profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
        if(!profile){
            // return res.status(400).json({msg:'profile not found'})
            const user=await User.findOne({_id:req.params.user_id}).select({name:1,avatar:1})
            profile={user}
        }
        res.json(profile)
    } catch (error) {
        console.log(error.message)
        if(err.kind=='ObjectId'){
            return res.status(400).json({msg:'profile not found'})
        }
        res.status(500).send('Server error')
    }
})


//@route   DELETE api/profile
//@desc    delete profile, user, post
//@access  Private
router.delete('/',auth,async(req,res)=>{
    try {
        //remove profile
        await Profile.findOneAndRemove({user:req.user.id})
        //remove user
        await User.findOneAndRemove({_id:req.user.id})

        res.json({msg:'user deleted'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


//@route   PUT api/profile/experience
//@desc    add profile expercience
//@access  Private
router.put('/experience',auth,async (req,res)=>{
const {title,location,from,to}=req.body
const newExp={title,location,from,to}
try {
    const profile= await Profile.findOne({user:req.user.id})
    profile.experience.unshift(newExp)
    await profile.save()
    res.json(profile)
} catch (error) {
    res.status(500).send('Server error')
}
})


//@route   DELETE api/profile/experience/:exp_id
//@desc    remove profile expercience
//@access  Private
router.delete('/experience/:exp_id',auth,async(req,res)=>{
    try {
        const profile= await Profile.findOne({user:req.user.id})
        
        //get remove index
        const removeIndex= profile.experience.map(exp=>exp.id).indexOf(req.params.exp_id)

        profile.experience.splice(removeIndex,1)

        await profile.save()
        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
        
    }
})


//@route   PUT api/profile/education
//@desc    add profile education
//@access  Private
router.put('/education',auth,async (req,res)=>{
    const {school,degree,fieldOfStudy,from,to}=req.body
    const newEd={school,degree,fieldOfStudy,from,to}
    try {
        const profile= await Profile.findOne({user:req.user.id})
        profile.education.unshift(newEd)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
    })
    
    
    //@route   DELETE api/profile/education/:ed_id
    //@desc    remove profile education
    //@access  Private
    router.delete('/education/:ed_id',auth,async(req,res)=>{
        try {
            const profile= await Profile.findOne({user:req.user.id})
            
            //get remove index
            const removeIndex= profile.education.map(ed=>ed.id).indexOf(req.params.ed_id)
    
            profile.education.splice(removeIndex,1)
    
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.log(error.message)
            res.status(500).send('Server error')
            
        }
    })



module.exports=router