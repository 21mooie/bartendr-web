import React, { useEffect, useState } from 'react';

import './CommentListRenderer.css';
import Comment from '../../Comment/Comment';



const CommentListRenderer = ({comments}) => {
    return (
        <div className="commentListRenderer">
            <ul className="commentListRenderer__comments">
                { comments.length > 0 && comments.map((comment, index) => (<li key={index}><Comment commentData={comment}/></li>)) }
                { comments.length === 0 && <li>There are no comments. You can be the first!</li> }
            </ul>
        </div>
    );
}
 
export default CommentListRenderer;
