const mongoose=require('mongoose')

const ProfileSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    bio:{
        type:String
    },
    location:{
        type:String
    },
    from:{
        type:String,
    },
    birthdate:{
        type:Date,
    },
    creationDate:{
        type:Date,
        default:Date.now
    },
    experience:[{
        title:{
            type:String
        },
        location:{
            type:String
        },
        from:{
            type:Date
        },
        to:{
            type:Date,
            default:Date.now
        }
    }],
    education:[{
        school:{
            type:String
        },
        degree:{
            type:String
        },
        fieldOfStudy:{
            type:String
        },
        from:{
            type:Date
        },
        to:{
            type:Date,
            default:Date.now
        }
    }]
})

module.exports= Profile =mongoose.model('profile',ProfileSchema)