import React, { useEffect, useState } from 'react';
import { Avatar, Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { store as notificationsModule } from 'react-notifications-component';

import './Comment.css';
import WithLoading from '../WithLoading/WithLoading';
import { getCommentsAsync as getRepliesAsync } from '../../../async/comments/comments';
import ReplyListRenderer from '../ListRenderer/ReplyListRenderer/ReplyListRenderer';
import CommentBox from '../CommentBox/CommentBox';
import { dateToReadableTimeFrame } from '../../../funcs/date/date';
import { postInteractionAsync } from '../../../async/interactions/interactions';

const ReplyListRendererWithLoading = WithLoading(ReplyListRenderer);

const Comment = ({commentData, updateComment, index, showReplies, showReplyBox, indentReplies}) => {
    //TODO: seperate state which is related to reply into its own component
    const [repliesRequested, setRepliesRequested]       = useState(false)
    const [replies, setReplies]                         = useState([]);
    const [isLoading, setIsLoading]                     = useState(false);
    const [initialLoad, setInitialLoad ]                = useState(true);
    const [offset, setOffset]                           = useState(0);
    const [endOfData, setEndOfData]                     = useState(false);
    const [displayLikes, setDisplayLikes]               = useState(0);

    const isAuthenticated                               = useSelector((state) => state.authenticated.status);
    const uid                                           = useSelector((state) => state.user.uid);
    const history                                       = useHistory();
    //TODO: Refactor reply logic into ReplyList Component
    useEffect(() => {
        setDisplayLikes(commentData.numLikes-commentData.numDislikes)
        if(repliesRequested) {
            setIsLoading(true);
            getRepliesAsync({idDrink: commentData.idDrink, offset, limit: 5, parentId: commentData.commentId})
                .then((data) => {
                    const commentMap = {};
                    for (let reply of replies) {
                        commentMap[reply.commentId] = true;
                    }
                    setReplies([...replies, ...data.results.filter((comment) => commentMap[comment.commentId] === undefined)]);
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
        //TODO: Once interactions get refactored remove commentData dependency
    }, [repliesRequested, commentData]);

    const showRepliesClicked = () => {
        updateComment(index, { showReplies: !showReplies });
        if(initialLoad) setRepliesRequested(true);
    };

    const replyButtonClicked = () => {
        if(!isAuthenticated){
            notificationsModule.addNotification({
                title: "Hey!",
                message: "Login to interact with comments",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3500,
                    onScreen: true
                }
            });
            history.push({pathname: '/signup'});
        }
        updateComment(index, { showReplyBox: !showReplyBox });
    };

    const updateReplies = (comment) => {
        setReplies([comment,...replies]);
        //TODO could perform a check beforehand to check if this is necessary; may save performance
        updateComment(index, { showReplies: true, hasReplies: true });
        setInitialLoad(false);
    };

    const interactionClicked = (currentInteraction) => {
        if(!isAuthenticated) {
            notificationsModule.addNotification({
                title: "Hey!",
                message: "Login to interact with comments",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3500,
                    onScreen: true
                }
            });
            history.push({pathname: '/signup'});
        }
        if(currentInteraction !== commentData.interaction) {
            postInteractionAsync('IDDRINK_COMMENT', commentData.idDrink, currentInteraction, commentData.commentId, uid)
            .then(() => {
                const update = {
                    numLikes: commentData.numLikes,
                    numDislikes: commentData.numDislikes,
                    interaction: currentInteraction,
                };
                if(currentInteraction === 'LIKE'){
                    update.numLikes += 1;
                    if(commentData.interaction === 'DISLIKE')
                        update.numDislikes -= 1;
                }
                else {
                    update.numDislikes += 1;
                    if(commentData.interaction === 'LIKE')
                        update.numLikes -= 1;
                }
                   
                updateComment(index, update);
            })
            .catch((err) => {
                console.error(err);
            });
        }
    };

    const updateReply = (idx, update) => {
        replies[idx] = {...replies[idx], ...update};
        setReplies([...replies]);
    };

    
    //TODO: Find a solution that won't push the width of the replies perpetually to the right. Maybe after two levels the replies are inline
    

    return (
        <div className='comment'>
            <div className='comment__main'>
                <div className="comment__avi__div">
                    {
                        commentData.commenterAvi ?
                            <img 
                                alt={`${commentData.commenterUsername}`}
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
                    <p className="comment_datePosted">posted { dateToReadableTimeFrame(new Date(commentData.dateTimeCreated)) }</p>
                    <div className="comment__interactions">
                        <ThumbUpIcon style={{ cursor : 'pointer', color  : commentData.interaction === 'LIKE' ? 'green' : ''}} onClick={() => interactionClicked('LIKE')}  />
                        <span className="comment__interactions_likeCount">{displayLikes}</span>
                        <ThumbDownIcon style={{cursor: 'pointer', color  : commentData.interaction === 'DISLIKE' ? 'red' : ''}} onClick={() => interactionClicked('DISLIKE')} />
                        <Button
                            className="comment__interactions_reply"
                            onClick={replyButtonClicked}
                        >
                            {
                                showReplyBox ? 'Close' : 'Reply' 
                            }
                        </Button>
                        
                    </div>
                    {
                        showReplyBox && commentData.idDrink &&
                        <CommentBox idDrink={commentData.idDrink} parentId={commentData.commentId} updateComment={updateReplies} isReplyBox={true} />
                    }
                </div>
            </div>
            {
                commentData.hasReplies &&
                <div className={`${indentReplies ? 'comment__showReplies_div' : 'comment__showReplies_div_no_indent'}`}>
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
                            <ReplyListRendererWithLoading
                                replies={replies}
                                isLoading={isLoading || initialLoad}
                                initialLoad={initialLoad}
                                updateReply={updateReply}
                            />
                                {
                                    !endOfData &&
                                    <Button className='comment__showMoreReplies' onClick={() => setRepliesRequested(true)}>Show more</Button>
                                }
                        </div>
                    }
                </div>
            }
        </div>
    );
}
 
export default Comment;
