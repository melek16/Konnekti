import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Like = ({like,currentUser}) => {
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const navigate=useNavigate()
    var img = new Image();
    img.src = like && like.avatar
    img.style.display = "none";
    img.onload = function(){
    this.style.display = "block";
    this.id='profile_avatar'
    if(this.width>this.height){
        setHeight(33)
        setWidth(null)
    }
    if(this.height>this.width){
        setWidth(33)
        setHeight(null)
    }
    if(this.width===this.height){
        setWidth(33)
        setHeight(33)
    }
}
    return (
        <div className='likeLink' onClick={()=>navigate(currentUser._id===like.user?'/profile': `/profile/${like.user}`)}>
            <div id="nav_avatar_container">
                            <img src={like.avatar} alt="" width={width} height={height}/>
                        </div>
            <p>{like.name}</p>
        </div>
    )
}

export default Like
