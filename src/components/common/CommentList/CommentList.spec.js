import React from 'react';
import { render, screen, waitForElement, wait } from '@testing-library/react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';

import CommentList from './CommentList';
import commentsMock from '../../../mocks/comments.mock';
import { getCommentsAsync } from '../../../async/comments/comments';

jest.mock( '../../../async/comments/comments');

describe('CommentList', () => {
    beforeAll(() => {
        mockIntersectionObserver();
        getCommentsAsync.mockImplementation(() => Promise.resolve(commentsMock))
    });

    it('should render.', async () => {
        render(<CommentList idDrink="11111" limit="10" postedComments={[]} />);
        await waitForElement(() =>  {
            const list = screen.getAllByRole('listitem');
            if(list.length > 1) {
                expect(list.length).toBeGreaterThan(1);
                return true;
            }
            else {
                return false
            }
        });
    });

    it('should handle an error getting comments.', async () => {
        getCommentsAsync.mockImplementationOnce(() => Promise.reject('error'));
        // how to mock console
        const spy = jest.spyOn(console, "error").mockImplementation(() => {});
        render(<CommentList idDrink="11111" limit="10" postedComments={[]} />);
        // how to wait for spies
        await wait(() => expect(spy).toHaveBeenCalled());
    });

    it('should render the user\'s posted comments above any other comments.', async () => {
        const { container } = render(<CommentList idDrink="11111" limit="10" postedComments={[{
            "commentId": "65daa323ade96a7b84d08713",
            "content": "testPostedComment",
            "parentId": null,
            "commenterUid": "d436482a-0c41-430d-a2cb-dccab4cccbfc",
            "idDrink": "178332",
            "dateTimeCreated": "2024-02-25T02:17:06.942Z",
            "numLikes": 0,
            "numDislikes": 0,
            "hasReplies": false,
            "commenterUsername": "muata100723_1",
            "commenterAvi": "https://test.com"
        }]} />);
        await wait(() => {
            screen.debug('');
            const p = container.querySelector('.comment__content');
            expect(p.innerHTML).toBe('testPostedComment');
        });
    });
});