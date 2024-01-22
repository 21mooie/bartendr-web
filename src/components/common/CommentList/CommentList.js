import React, { useEffect, useState } from 'react';

import './CommentList.css';
import Comment from '../../common/Comment/Comment';
import { getCommentsAsync } from '../../../async/comments/comments';


const CommentList = ({idDrink, limit}) => {
    const [comments, setComments] = useState([]);
    const [offset, setOffset]     = useState('0');

    useEffect(() => {
        getCommentsAsync({idDrink, offset, limit, parentId: null})
            .then((data) => setComments([...comments, ...data]))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div className="commentList">
            <ul className="commentList__comments">
                { comments.length > 0 && comments.map((comment, index) => (<li key={index}><Comment commentData={comment}/></li>)) }
                { comments.length === 0 && <li>There are no comments. You can be the first!</li> }
            </ul>
        </div>
    );
}
 
export default CommentList;
