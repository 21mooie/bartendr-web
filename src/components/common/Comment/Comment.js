import React from 'react';
import { Avatar } from '@material-ui/core';

import './Comment.css';

const Comment = ({commentData}) => {
    return (
        <div className="comment">
            <div className="comment__avi__div">
                {
                    commentData.commenterAvi ?
                        <img 
                            alt={`Image of commenter ${commentData.commenterUsername}`}
                            src={commentData.commenterAvi}
                            className="comment__avi"
                        />
                    :
                        <Avatar
                            alt={`Image of empty avatar for commenter ${commentData.commenterUsername}`}
                            src={commentData.commenterAvi}
                            style={{height: 70, width: 70}}
                        />
                }
            </div>
            <div>
                <h4>{commentData.commenterUsername}</h4>
                <p className="comment__content">{commentData.content}</p>
                <p className="comment_datePosted">posted {commentData.dateTimeCreated}</p>
            </div>
            
        </div>
    );

    // write function to figure out how many minutes/hours/days/months/years a comment was written
}
 
export default Comment;
