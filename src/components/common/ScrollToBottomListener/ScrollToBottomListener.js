import React from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const ScrollToBottomListener = ({ bottomReachedCallback }) => {
    useBottomScrollListener(() => bottomReachedCallback());
    return (<></>);
}
 
export default ScrollToBottomListener;