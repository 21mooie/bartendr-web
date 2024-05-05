import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import CommentListRenderer from './CommentListRenderer';
import commentsMock from '../../../../mocks/comments.mock';

const mockStore = configureStore([]);
jest.mock('../../../../async/interactions/interactions', () => (
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

describe('CommentListRenderer', () => {
    //TODO: store and provider will be removed
    let store;
    beforeAll(() => {
        mockIntersectionObserver();
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
        const { container } = render(<Provider store={store} ><CommentListRenderer comments={commentsMock.results} refProp={null} idDrink='11111' /></Provider>);
        await wait(() =>  {
            expect(container.querySelector('.comment')).toBeInTheDocument();
        });
        
    });

    //TODO: when interactions is refactored from here this will be removed
    it('should render no comments.', () => {
        render(<Provider store={store} ><CommentListRenderer comments={[]} refProp={null}/></Provider>)
        expect(screen.getByText('There are no comments. You can be the first!')).toBeInTheDocument();
    });
    
});