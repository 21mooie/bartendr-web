import React from 'react';

import CommentList from '../../common/CommentList/CommentList';

const CommentSection = ({idDrink}) => {
    return (
        <div className="commentSection">
            <CommentList idDrink={idDrink} limit={10}/>
        </div>
    );
}
 
export default CommentSection;
