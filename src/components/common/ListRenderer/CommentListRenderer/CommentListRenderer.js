import React, { useEffect, useRef, useState }  from 'react';

import './CommentListRenderer.css';
import Comment from '../../Comment/Comment';
import { getInteractionsAsync } from '../../../../async/interactions/interactions';
import { useSelector } from 'react-redux';




const CommentListRenderer = ({comments, bottomReachedCallback, idDrink}) => {
    const myRef                                         = useRef();
    const isAuthenticated                               = useSelector((state) => state.authenticated.status);
    const uid                                           = useSelector((state) => state.user.uid);
    const [interactionComments, setInteractionComments] = useState([]);

    useEffect(() => {
        //TODO: refactor getComments to get Interactions within itself instead of updating them in another trip
        if (isAuthenticated && interactionComments.length === 0) {
            getInteractionsAsync('IDDRINK_COMMENT', uid,  { commentIds: comments.map(comment => comment.commentId ), idDrink })
                .then((data) => {
                    const interactionResults = data.result;
                    comments.forEach((comment) => {
                        comment.interaction = interactionResults[comment.commentId]
                    });
                    setInteractionComments([...comments]);
                })
                .catch((err) => {
                    console.error(err);
                })
        } else {
            comments[0].interaction = 'NONE';
            setInteractionComments([...comments, ...interactionComments]);
        }
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if(entry.isIntersecting) {
                console.log('intersecting');
                bottomReachedCallback();
            }
        });
        if(interactionComments.length-5 >= 0) observer.observe(myRef.current);
    }, [comments]);

    return (
        <div className="commentListRenderer">
            <ul className="commentListRenderer__comments">
                { 
                    interactionComments.length > 0 &&
                    interactionComments.map((comment, index) => {
                        if (index + 5 === interactionComments.length) return (<li key={index} ref={myRef}>
                                                                        <Comment commentData={comment} />
                                                                    </li>)
                        return <li key={index}><Comment commentData={comment}/></li>
                    }) 
                }
                { interactionComments.length === 0 && <li>There are no comments. You can be the first!</li> }
            </ul>
        </div>
    );
}
 
export default CommentListRenderer;
