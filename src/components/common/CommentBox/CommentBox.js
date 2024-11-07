import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { store as notificationsModule } from 'react-notifications-component';

import './CommentBox.css';
import {
    postCommentAsync,
    postStatusAsync
} from '../../../async/comments/comments';


const CommentBox = ({idDrink, parentId, updateComment, isReplyBox, statusId, commentType, statusOwnerUid}) => {
    const history         = useHistory();
    const uid             = useSelector((state) => state.user.uid);
    const isAuthenticated = useSelector((state) => state.authenticated.status);

    const [comment, setComment]                     = useState('');
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(!isAuthenticated || comment === '');

    const authenticationGuard = () => {
        if(!isAuthenticated) {
            notificationsModule.addNotification({
                title: "Hey!",
                message: "Must login to enter a comment",
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
            return false;
        }
        return true;
    };

    const textAreaChanged = (e) => {
        setSubmitBtnDisabled(!isAuthenticated || e.target.value === '');
        setComment(e.target.value);
    };

    const textAreaClicked = () => {
         authenticationGuard();
    };

    const cancelClicked = () => {
        authenticationGuard();
        setComment('');
    };

    const submitClicked = () => {
        //TODO: Add a loading logic while ui is waiting for a post to be submitted
        if (authenticationGuard()){
            if (commentType === 'IDDRINK')
                postCommentAsync(uid, idDrink, parentId, comment)
                    .then((response) => {
                        updateComment(response.comment)
                    })
                    .catch((err) => {
                        console.error(err);
                        notificationsModule.addNotification({
                            title: "Uh-oh!",
                            message: "There was an error with posting your comment.",
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
                    })
                    .finally(() => {
                        setComment('');
                        setSubmitBtnDisabled(true);
                    });
            else
                postStatusAsync(uid, statusId, parentId, comment, statusOwnerUid)
                    .then(data => updateComment(data))
                    .catch((err) => {
                        console.error(err);
                        notificationsModule.addNotification({
                            title: "Uh-oh!",
                            message: "There was an error with posting your comment.",
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
                    })
                    .finally(() => {
                        setComment('');
                        setSubmitBtnDisabled(true);
                    });
        }
    };

    return (
        <div className='commentBox'>
            <div>
                <textarea
                    className={`${isReplyBox ? 'commentBox__replyBox__textarea' : 'commentBox__textarea'}`}
                    onClick={textAreaClicked}
                    value={comment}
                    placeholder={commentType === 'IDDRINK' ? "Add a comment..." : statusId ? 'Write a quick message...' : "Update your status..."}
                    onChange={textAreaChanged}
                />
                <div className='commentBox__buttons'>
                    <Button 
                        onClick={submitClicked}
                        variant='outlined'
                        color='primary'
                        disabled={submitBtnDisabled}
                        className='commentBox__submit'
                    >
                        Comment
                    </Button>
                    <Button 
                        variant='outlined'
                        className='commentBox__cancel'
                        onClick={cancelClicked}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}
 
export default CommentBox;