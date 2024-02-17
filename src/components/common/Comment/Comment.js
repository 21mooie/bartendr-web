import React, { useEffect, useState } from 'react';
import { Avatar, Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import './Comment.css';
import WithLoading from '../WithLoading/WithLoading';
import { getCommentsAsync } from '../../../async/comments/comments';
import ReplyListRenderer from '../ListRenderer/ReplyListRenderer/ReplyListRenderer';

const ReplyListRendererWithLoading = WithLoading(ReplyListRenderer);

const Comment = ({commentData}) => {
    const [showReplies, setShowReplies]            = useState(false);
    const [repliesRequested, setRepliesRequested ] = useState(false)
    const [replies, setReplies]                    = useState([]);
    const [isLoading, setIsLoading]                = useState(false);
    const [initialLoad, setInitialLoad ]           = useState(true);
    const [offset, setOffset]                      = useState(0);
    const [endOfData, setEndOfData]                = useState(false);
    //TODO: Refactor reply logic into ReplyList Component

    useEffect(() => {
        if(repliesRequested) {
            setIsLoading(true);
            getCommentsAsync({idDrink: commentData.idDrink, offset, limit: 5, parentId: commentData.commentId})
                .then((data) => {
                    setReplies([...replies, ...data.results]);
                    setOffset(offset+5);
                    if(data.endOfData) setEndOfData(true);
                })
                .catch((err) => console.error(err))
                .finally(() => {
                    setIsLoading(false);
                    setInitialLoad(false);
                    setRepliesRequested(false);
                });
        }
    }, [repliesRequested]);

    const showRepliesClicked = () => {
        setShowReplies(!showReplies);
        if(initialLoad) setRepliesRequested(true);
    };

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
                    <div className="comment__showReplies_div">
                        <div className="comment__showReplies" onClick={() => showRepliesClicked()}>
                            {
                                showReplies ?
                                    <>
                                        <ArrowDropDownIcon className="comment__showReplies_dropDown"/>
                                        <span>Hide replies</span>
                                    </>
                                :
                                    <>
                                        <ArrowDropUpIcon className="comment__showReplies_dropUp"/>
                                        <span>Show replies</span>
                                    </>
                            }
                            
                        </div>
                        {   
                            showReplies      &&
                            <div className="comment__replies">
                                <ReplyListRendererWithLoading replies={replies} isLoading={isLoading || initialLoad} initialLoad={initialLoad}/>
                                {
                                    !endOfData &&
                                    <Button onClick={() => setRepliesRequested(true)}>Show more</Button>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
    //TODO: finish writing logic to increment likes and dislikes and count if a user has already liked something
    // write function to figure out how many minutes/hours/days/months/years a comment was written
}
 
export default Comment;
