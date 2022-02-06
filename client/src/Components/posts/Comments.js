import React from 'react'
import Comment from './Comment'

const Comments = ({comments,postId,shownComments,setShownComments}) => {
    return (
        <div>
            {
                comments.map(comment=>comments.indexOf(comment)<shownComments?<Comment comment={comment} postId={postId}/>:null)
            }
            {comments.length>shownComments?<p id="showMoreComments" onClick={()=>setShownComments(shownComments+3)}>Show more comments...</p>:null}
        </div>
    )
}

export default Comments
