import React, { useRef, useState } from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { store as notificationsModule } from 'react-notifications-component';

import './CommentBox.css';


const CommentBox = ({parentId}) => {
    const history         = useHistory();
    const isAuthenticated = useSelector((state) => state.authenticated.status);
    const textRef         = useRef();
    const submitRef       = useRef();

    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

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
            return;
        }
    };

    const textAreaChanged = (e) => {
        setSubmitBtnDisabled(!isAuthenticated || textRef.current.value === '');
    };

    const textAreaClicked = () => {
         authenticationGuard();
    };

    const cancelClicked = () => {
        authenticationGuard();
        textRef.current.value = '';
    };

    const submitClicked = () => {
        authenticationGuard();
    };

    return (
        <div className='commentBox'>
            <div>
                <textarea
                    onClick={textAreaClicked}
                    ref={textRef}
                    placeholder="Add a comment..."
                    onChange={textAreaChanged}
                />
                <div className='commentBox__buttons'>
                    <Button 
                        text='Comment'
                        onSubmit={submitClicked}
                        variant='outlined'
                        color='primary'
                        disabled={submitBtnDisabled}
                        ref={submitRef}
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