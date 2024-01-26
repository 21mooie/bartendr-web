import React from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const ScrollListener = ({ bottomReachedCallback }) => {
    useBottomScrollListener(() => bottomReachedCallback());
    return (<></>);
}
 
export default ScrollListener;