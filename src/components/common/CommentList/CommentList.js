import React, { useEffect, useState, useRef } from 'react';

import { getCommentsAsync } from '../../../async/comments/comments';
import WithLoading from '../WithLoading/WithLoading';
import CommentListRenderer from './CommentListRenderer/CommentListRenderer';

const CommentListRendererWithLoading = WithLoading(CommentListRenderer);

const CommentList = ({idDrink, limit}) => {
    // initialLoad helps to make sure the component's first render shows the loading spinner
    const [comments, setComments]        = useState([]);
    const [offset,   setOffset]          = useState(0);
    const [initialLoad, setInitialLoad ] = useState(true);
    const [loading,  setLoading]         = useState(false);
    const [endOfData, setEndOfData]      = useState(false);
    
    const myRef = useRef();

    useEffect(() => {
        setLoading(true);
        getCommentsAsync({idDrink, offset, limit, parentId: null})
            .then((data) => {
                setComments([...comments, ...data.results]);
                if(data.endOfData){
                    setEndOfData(true);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setLoading(false)
                setInitialLoad(false);
                //TODO: Figure out why this is requesting one additional time
                //TODO: Place in its own Higher order component
                console.log(myRef.current);
                const observer = new IntersectionObserver((entries) => {
                    const entry = entries[0];
                    console.log('entry', entry);
                    if(entry.isIntersecting) {
                        console.log('intersecting');
                        if(!endOfData){
                            console.log(offset);
                            updateOffset();
                        }
                    }
                });
                observer.observe(myRef.current);
            });
    }, [offset]);

    const updateOffset = () => {
        console.log('bottom reached');
        setOffset(offset+limit);
    }

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
            <CommentListRendererWithLoading isLoading={loading || initialLoad} comments={comments} initialLoad={initialLoad} refProp={myRef}/>
        </div>
    );
}
 
export default CommentList;
