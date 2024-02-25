import React, { useState } from 'react';

import './CommentSection.css';
import CommentBox from '../../common/CommentBox/CommentBox';
import CommentList from '../../common/CommentList/CommentList';

const CommentSection = ({idDrink}) => {
    const [postedComments, setPostedComments] = useState([]);
    return (
        <div className="commentSection">
            <CommentBox parentId={null} idDrink={idDrink} updateComment={(comment) => setPostedComments([ comment,...postedComments])} />
            <CommentList idDrink={idDrink} limit={10} postedComments={postedComments} />
        </div>
    );
}
 
export default CommentSection;
