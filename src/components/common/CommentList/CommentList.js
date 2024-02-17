import React, { useEffect, useState } from 'react';

import { getCommentsAsync } from '../../../async/comments/comments';
import WithLoading from '../WithLoading/WithLoading';
import CommentListRenderer from '../ListRenderer/CommentListRenderer/CommentListRenderer';


const CommentListRendererWithLoading = WithLoading(CommentListRenderer);

const CommentList = ({idDrink, limit}) => {
    // initialLoad helps to make sure the component's first render shows the loading spinner
    const [comments, setComments]        = useState([]);
    const [offset,   setOffset]          = useState(0);
    const [initialLoad, setInitialLoad ] = useState(true);
    const [loading,  setLoading]         = useState(false);
    const [endOfData, setEndOfData]      = useState(false);

    useEffect(() => {
        setLoading(true);
        getCommentsAsync({idDrink, offset, limit, parentId: null})
            .then((data) => {
                setComments([...comments, ...data.results]);
                if(data.endOfData) setEndOfData(true);
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setLoading(false)
                setInitialLoad(false);
            });
    }, [offset]);

    const updateOffset = () => {
        console.log('bottom reached');
        if(!endOfData) setOffset(offset+limit);
    }

    return (
        <div className='commentList'>
            <CommentListRendererWithLoading comments={comments} isLoading={loading || initialLoad} initialLoad={initialLoad} bottomReachedCallback={updateOffset} />
        </div>
    );
}
 
export default CommentList;
