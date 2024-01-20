import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import './Comment.css';

const Comment = ({commentData}) => {
    const [showReplies, setShowReplies] = useState(false);
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
                <div className="comment__interactions">
                    <ThumbUpIcon style={{cursor: 'pointer'}}/>
                    <span className="comment__interactions_likeCount">{commentData.numLikes-commentData.numDislikes}</span>
                    <ThumbDownIcon style={{cursor: 'pointer'}}/>
                    <span className="comment__interactions_reply">Reply</span>
                </div>
                {
                    commentData.hasReplies &&
                    <div className="comment__showReplies" onClick={() => setShowReplies(!showReplies)}>
                        {
                            showReplies ?
                                <ArrowDropDownIcon className="comment__showReplies_dropDown"/>
                            :
                                <ArrowDropUpIcon className="comment__showReplies_dropUp"/>
                        }
                        <span>Show replies</span>
                    </div>
                }
            </div>
        </div>
    );
    // TODO: finish writing logic to increment likes and dislikes and count if a user has already liked something
    // write function to figure out how many minutes/hours/days/months/years a comment was written
}
 
export default Comment;
