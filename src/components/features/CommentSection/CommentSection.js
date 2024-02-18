import React from 'react';

import './CommentSection.css';
import CommentBox from '../../common/CommentBox/CommentBox';
import CommentList from '../../common/CommentList/CommentList';

const CommentSection = ({idDrink}) => {
    return (
        <div className="commentSection">
            <CommentBox />
            <CommentList idDrink={idDrink} limit={10}/>
        </div>
    );
}
 
export default CommentSection;
