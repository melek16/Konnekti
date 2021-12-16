const mongoose=require('mongoose')
const Schema=mongoose.Schema


const PostSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    text:{
        type:String,
        required:true
    },
    likes:[
        {
            user:{
                type:Schema.Types.ObjectId,
                reference:'user'
            }
        }
    ],
    name:{
        type:String
    },
    postImg:{
        type:String
    },
    comments:[
        {
            user:{
                type:Schema.Types.ObjectId,
                reference:'user'
            },
            text:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            },
            name:{
                type:String
            },
            avatar:{
                type:String
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=Post=mongoose.model('post',PostSchema)