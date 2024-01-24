import React, { useEffect, useState } from 'react';

import { getCommentsAsync } from '../../../async/comments/comments';
import WithLoading from '../WithLoading/WithLoading';
import CommentListRenderer from './CommentListRenderer/CommentListRenderer';

const CommentListRendererWithLoading = WithLoading(CommentListRenderer);

const CommentList = ({idDrink, limit}) => {
    const [comments, setComments] = useState([]);
    const [offset,   setOffset]   = useState('0');
    const [loading,  setLoading]  = useState(false);

    useEffect(() => {
        setLoading(true);
        getCommentsAsync({idDrink, offset, limit, parentId: null})
            .then((data) => setComments([...comments, ...data]))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);
    return (
        <div className='commentList'>
            <CommentListRendererWithLoading isLoading={loading} comments={comments} />
        </div>
    );
}
 
export default CommentList;
