import React from 'react';

import './ReplyListRenderer.css';
import Comment from '../../Comment/Comment';

const ReplyListRenderer = ({replies, updateReply}) => {
    // TODO: add request to get the interactions for all the comments
    // make sure reply interactions are being gotten from the comment level
    return (
        <div className='replyListRenderer'>
            <ul className="replyListRenderer__replies">
                {
                    replies.length > 0 &&
                    replies.map((reply, index) => <li key={index}>
                                                        <Comment
                                                            commentData={reply}
                                                            index={index}
                                                            updateComment={(idx, update) => updateReply(idx, update)}
                                                            indentReplies={false}
                                                            showReplies={reply.showReplies}
                                                            showReplyBox={reply.showReplyBox}
                                                        />
                                                  </li>)
                }
                { replies.length === 0 && <li>There are no replies. Please submit an error ticket!</li> }
            </ul>
        </div>
    );
}
 
export default ReplyListRenderer;