import React, { useEffect, useRef }  from 'react';

import './CommentListRenderer.css';
import Comment from '../../Comment/Comment';




const CommentListRenderer = ({comments, bottomReachedCallback, updateComment}) => {
    const myRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if(entry.isIntersecting) {
                console.log('intersecting');
                bottomReachedCallback();
            }
        });
        if(comments.length-5 >= 0) observer.observe(myRef.current);
    }, [comments]);

    return (
        <div className="commentListRenderer">
            <ul className="commentListRenderer__comments">
                { 
                    comments.length > 0 &&
                    comments.map((comment, index) => {
                        if (index + 5 === comments.length) return (<li key={index} ref={myRef}>
                                                                        <Comment commentData={comment} />
                                                                    </li>)
                        return <li key={index}>
                                    <Comment
                                        commentData={comment}
                                        updateComment={(idx, update) => updateComment(idx, update)}
                                        index={index}
                                        showReplies={comment.showReplies}
                                        showReplyBox={comment.showReplyBox}
                                        indentReplies={true}
                                />
                                </li>
                    }) 
                }
                { comments.length === 0 && <li>There are no comments. You can be the first!</li> }
            </ul>
        </div>
    );
}
 
export default CommentListRenderer;
