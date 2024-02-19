import React from 'react';
import { Button } from '@material-ui/core';

import './CommentBox.css';
import CTAButton from '../Button/CTAButton';


const CommentBox = ({parentId}) => {
    return (
        <div className='commentBox'>
            <div>
                <textarea />
                <div class='commentBox__buttons'>
                    <CTAButton 
                        text='Comment'
                        func={() => console.log('hello world')} className='commentBox__submit'
                        />
                    <Button variant='outlined' className="commentBox__cancel">Cancel</Button>
                </div>
            </div>
        </div>
    );
}
 
export default CommentBox;