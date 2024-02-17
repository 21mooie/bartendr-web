import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Comment from './Comment';
import Reply from '';

describe('Comment', () => {
    let commentData;
    beforeAll(() => {
        commentData = {
            "commentId": "65804aea979a92734c307e51",
            "content": "Hi this is the twelfth comment",
            "parentId": null,
            "commenterUid": "7c0b82f1-835b-42b0-912d-ba893562f2f4",
            "idDrink": "178332",
            "dateTimeCreated": "2023-12-18T13:36:42.051Z",
            "numLikes": 0,
            "numDislikes": 0,
            "hasReplies": false,
            "commenterUsername": "muata01092021",
            "commenterAvi": "https://real-image-url.com"
        };
    });
    it('should render.', () => {
        render(<Comment commentData={commentData} />);
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('should show empty avatar when no avi is present.', () => {
        commentData.commenterAvi = "";
        const { container } = render(<Comment commentData={commentData} />);
        expect(container.querySelector('.MuiAvatar-root')).toBeInTheDocument();
    });

    it('should show replies when the button is clicked.', () => {
        commentData.hasReplies = true;
        const { container } = render(<Comment commentData={commentData} />);
        expect(container.querySelector('.comment__showReplies_dropUp')).toBeInTheDocument();
        userEvent.click(container.querySelector('.comment__showReplies'));
        expect(container.querySelector('.comment__showReplies_dropDown')).toBeInTheDocument();
    });

    describe('when it has replies', () => {
        beforeAll(() => {
            commentData.hasReplies = true;
        });

        it('should show replies when requested.', () => {
            //TODO: Change to reply component mock once I've made them
            const { container } = render(<Comment commentData={commentData} />);
            expect(container.querySelector('.reply')).not.toBeInTheDocument();
            userEvent.click(container.querySelector('.comment__showReplies'));
            expect(container.querySelector('.reply')).toBeInTheDocument();
        });

        it('should hide replies when requested.', () => {
            const { container } = render(<Comment commentData={commentData} />);
            expect(container.querySelector('.reply')).not.toBeInTheDocument();
            userEvent.click(container.querySelector('.comment__showReplies'));
            expect(container.querySelector('.reply')).toBeInTheDocument();
            userEvent.click(container.querySelector('.comment__showReplies'));
            expect(container.querySelector('.reply')).not.toBeInTheDocument();
        });

        it('should not send a new request for replies once replies are hidden then rerequested.', () => {
            
        });

        it('if there are more than the paginated number of replies a show more replies option should be shown.', () => {

        });
    });
});
