import React, { useState } from 'react';

import './CommentSection.css';
import CommentBox from '../../common/CommentBox/CommentBox';
import CommentList from '../../common/CommentList/CommentList';

const CommentSection = ({idDrink}) => {
    const [postedComment, setPostedComment] = useState(null);
    return (
        <div className="commentSection">
            <CommentBox
                parentId={null}
                idDrink={idDrink}
                updateComment={(comment) => setPostedComment(comment)}
                isReplyBox={false}
                commentType='IDDRINK'
            />
            <CommentList idDrink={idDrink} limit={10} postedComment={postedComment} />
        </div>
    );
}
 
export default CommentSection;
