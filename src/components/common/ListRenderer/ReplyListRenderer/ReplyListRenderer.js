import React from 'react';

import './ReplyListRenderer.css';
import Comment from '../../Comment/Comment';

const ReplyListRenderer = ({replies}) => {
    return (
        <div className='replyListRenderer'>
            <ul className="replyListRenderer__replies">
                {
                    replies.length > 0 &&
                    replies.map((reply, index) => <li key={index}> <Comment commentData={reply} /> </li>)
                }
                { replies.length === 0 && <li>There are no replies. Please submit an error ticket!</li> }
            </ul>
        </div>
    );
}
 
export default ReplyListRenderer;