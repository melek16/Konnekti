import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../../actions/post'

const CommentAdder = ({postId,shownComments,setShownComments}) => {
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    var img = new Image();
    img.src = user && user.avatar
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

const onSubmit=(e,text)=>{
    e.preventDefault()
    if(text){
        if(text.trim()){
            dispatch(addComment(postId,text))
            setShownComments(shownComments+1)
        }
    } 
    setComment('')
    document.querySelector('#textarea').style.height='28px'
    
}
function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (2+element.scrollHeight)+"px";
  }
    return (
        <div className='commentAdder'>
                        <div id="nav_avatar_container">
                <img src={user && user.avatar} alt="" width={width} height={height}/>
            </div>
            <form onSubmit={e=>onSubmit(e,comment)}>

         
            <textarea onKeyUp={e=>textAreaAdjust(e.target)} id="textarea" type="text" placeholder='Write a comment...' value={comment} onChange={e=>setComment(e.target.value)}/>
 
            <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default CommentAdder
