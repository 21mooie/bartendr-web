import React, { useEffect, useState } from 'react';

import { getCommentsAsync } from '../../../async/comments/comments';
import WithLoading from '../WithLoading/WithLoading';
import CommentListRenderer from './CommentListRenderer/CommentListRenderer';
import ScrollListener from '../ScrollToBottomListener/ScrollToBottomListener';

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
        debounce_leading(() => {})();
    }, [offset]);

    // debounce makes scroll wait for data to be gotten before sending another request for data
    const debounce_leading = (func, timeout = 300) => {
        let timer;
        return (...args) => {
          if (!timer) {
            func.apply(this, args);
          }
          clearTimeout(timer);
          timer = setTimeout(() => {
            timer = undefined;
          }, timeout);
        };
    }

    const updateOffset = () => {
        console.log('bottom reached');
        setOffset(offset+limit);
    }

    const requestData = debounce_leading(() => {
        if(!endOfData && !initialLoad) updateOffset()
    });

    return (
        //TODO: make a class name prop to make className commentList or replyList respectively
        //TODO: Update ScrollListener to be a component to more easily check for bottom of component
        // this is the plan
        /*
            <ScrollToBottomListener bottomCallBack>
                <Component bottomCallBack={ref}/>
            </ScrollToBottomListener>
        */
        
        <div className='commentList'>
            <CommentListRendererWithLoading isLoading={loading || initialLoad} comments={comments} initialLoad={initialLoad} />
            <ScrollListener bottomReachedCallback={() => requestData()} />
        </div>
    );
}
 
export default CommentList;
