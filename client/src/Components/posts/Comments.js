import React from 'react'
import Comment from './Comment'

const Comments = ({comments,postId}) => {
    return (
        <div>
            {
                comments.map(comment=><Comment comment={comment} postId={postId}/>)
            }
        </div>
    )
}

export default Comments
