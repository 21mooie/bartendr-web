import React, { useEffect, useState } from 'react';

import './CommentList.css';
import { getCommentsAsync } from '../../../async/comments/comments';
import WithLoading from '../WithLoading/WithLoading';
import CommentListRenderer from '../ListRenderer/CommentListRenderer/CommentListRenderer';
import { useSelector } from 'react-redux';


const CommentListRendererWithLoading = WithLoading(CommentListRenderer);

const CommentList = ({idDrink, limit, postedComment}) => {
    // initialLoad helps to make sure the component's first render shows the loading spinner
    const [comments, setComments]               = useState([]);
    const [offset,   setOffset]                 = useState(0);
    const [initialLoad, setInitialLoad ]        = useState(true);
    const [loading,  setLoading]                = useState(false);
    const [endOfData, setEndOfData]             = useState(false);
    const [requestComments, setRequestComments] = useState(true);
    const uid                                   = useSelector((state) => state.user.uid);

    useEffect(() => {
        if(postedComment && (comments.length === 0 || postedComment.commentId !== comments[0].commentId)){
            postedComment.showReplies = false;
            postedComment.showReplyBox = false;
            setComments(postedComment ? [postedComment, ...comments] : comments);
        }
            
        if(requestComments) {
            setLoading(true);
            getCommentsAsync({idDrink, offset, limit, parentId: null, uid })
                .then((data) => {
                    // custom props to help with rendering
                    for (const result of data.results) {
                        result.showReplies = false;
                        result.showReplyBox = false;
                    }
                    setComments([...comments, ...data.results]);
                    setOffset(offset+limit);
                    if(data.endOfData) setEndOfData(true);
                })
                .catch((err) => console.error(err))
                .finally(() => {
                    setLoading(false)
                    setInitialLoad(false);
                    setRequestComments(false);
                });
        }
    }, [requestComments, uid, postedComment]);

    const requestCommentsCallback = () => {
        if(!endOfData) setRequestComments(true);
    };

    const updateComment = (idx, update) => {
        comments[idx] = {...comments[idx], ...update};
        setComments([...comments]);
    };

    return (
        <div className='commentList'>
            <CommentListRendererWithLoading
                comments={comments}
                isLoading={loading || initialLoad}
                initialLoad={initialLoad}
                bottomReachedCallback={requestCommentsCallback}
                updateComment={updateComment}
            />
        </div>
    );
}
 
export default CommentList;
