const express=require('express')
const router= express.Router()
const {check,validationResult} =require('express-validator')
const bcrypt=require('bcryptjs')
const gravatar=require('gravatar')
const jwt=require('jsonwebtoken')
const config=require('config')
const User=require('../../models/User')
const auth=require('../../middleware/auth')





//@route   POST api/users
//@desc    register
//@access  Public
router.post('/',[
    check('name','name is required').notEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})
], async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {name,email,password}=req.body
    try {
        let user=await User.findOne({email})
        if(user){
            return res.status(400).json({errors:[{msg:'User already exists'}]})
        }

        const avatar=gravatar.url(email,{
            d:"mm",
            s:200

        })

        user=new User({
            name,
            email,
            password,
            avatar
        })

        const salt=await bcrypt.genSalt(10)
        user.password= await bcrypt.hash(password,salt)

        await user.save()

        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,
            config.get('jwtSecret'),
            {expiresIn:36000},
            (err,token)=>{
                if(err) throw err;
                res.json({token})
            } )
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
    
})


//modify user avatar
router.post('/avatarUpdate/:user_id',auth,async (req,res)=>{
    try {
        let user=await User.findById(req.params.user_id)
        user=await User.findOneAndUpdate({_id:req.params.user_id},{$set:{avatar:req.body.avatar}},{new:true})


        res.json(user)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }

})

module.exports=router