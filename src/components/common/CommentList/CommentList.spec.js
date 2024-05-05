import React from 'react';
import { render, screen, waitForElement, wait } from '@testing-library/react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import CommentList from './CommentList';
import commentsMock from '../../../mocks/comments.mock';
import { getCommentsAsync } from '../../../async/comments/comments';

const mockStore = configureStore([]);
jest.mock( '../../../async/comments/comments');
jest.mock('../../../async/interactions/interactions', () => (
    {
        getInteractionsAsync: jest.fn().mockImplementation(() => Promise.resolve({
            "type": "IDDRINK_COMMENT",
            "uid": "d436482a-0c41-430d-a2cb-dccab4cccbfc",
            "idDrink": "178332",
            "result": {
                "65ff10c243531d0022292e83": "LIKE",
                "65dbe2c05bd21f002234b634": "DISLIKE",
                "65dab3a3d40675799c09a301": "LIKE",
                "65daaa24d40675799c09a300": "LIKE",
                "65daa323ade96a7b84d08713": "LIKE",
                "65daa31fade96a7b84d08712": "DISLIKE",
                "65daa0f7ade96a7b84d08711": "LIKE",
                "65daa04dade96a7b84d08710": "DISLIKE",
                "65da9d24ade96a7b84d0870f": "LIKE",
                "65da9d20ade96a7b84d0870e": "LIKE"
            }
        }))
    }
));

// jest.mock('../ListRenderer/CommentListRenderer/CommentListRenderer', () => () =>
// <div className='commentListRenderer'>
//     <ul className="commentListRenderer__comments">
//         <li>This is a comment</li>
//     </ul>
// </div>)

describe('CommentList', () => {
    let store;
    beforeAll(() => {
        mockIntersectionObserver();
        getCommentsAsync.mockImplementation(() => Promise.resolve(commentsMock));
        store = mockStore({
            user: {
                uid: 'uid123',
                username: 'test_username',
            },
            authenticated: {
                status: true
            }
        });
    });

    it('should render.', async () => {
        render(<Provider store={store} ><CommentList idDrink="11111" limit="10" postedComments={[]} /></Provider>);
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
    //TODO: when interactions is refactored from here this will be removed
    it('should handle an error getting comments.', async () => {
        getCommentsAsync.mockImplementationOnce(() => Promise.reject('error'));
        // how to mock console
        const spy = jest.spyOn(console, "error").mockImplementation(() => {});
        render(<Provider store={store} ><CommentList idDrink="11111" limit="10" postedComments={[]} /></Provider>);
        // how to wait for spies
        await wait(() => expect(spy).toHaveBeenCalled());
    });
    //TODO: when interactions is refactored from here this will be removed
    xit('should render the user\'s posted comments above any other comments.', async () => {
        const { container } = render(<Provider store={store} ><CommentList idDrink="11111" limit="10" postedComments={[{
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
        }]} /></Provider>);
        await wait(() => {
            const p = container.querySelector('.comment__content');
            expect(p.innerHTML).toBe('testPostedComment');
        });
    });
});