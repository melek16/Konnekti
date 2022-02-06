import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../actions/post'
import {useNavigate} from 'react-router-dom'

const Comment = ({comment,postId}) => {
    const {user} = useSelector(state => state.auth)
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    var img = new Image();
    img.src = comment && comment.avatar
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
                    <div className='comment'>
                            {user && (user._id===comment.user) &&
                            <button id="deletePost" onClick={()=>dispatch(deleteComment(postId,comment._id))}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path>
                            </svg>
                            </button>}
                        <div className='postOwner'>
                        <div id="nav_avatar_container">
                            <img src={comment.avatar} alt="" width={width} height={height}/>
                        </div>
                        <div className='commentBox'>
                        <h4 onClick={()=>navigate(user._id===comment.user?'/profile': `/profile/${comment.user}`)}>{comment.name}</h4>
                        <p className='postText'>{comment.text}</p>
                        </div>  
                        </div>
                        
                        </div>
    )
}

export default Comment
