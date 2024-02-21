import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import CommentSection from './CommentSection';

jest.mock('../../common/CommentList/CommentList', () => () => <div className="commentListTest">Comment List</div>);
const mockStore = configureStore();

describe('CommentSection', () => {
    test('should render.', async () => {
        let store = mockStore({
            user: {
                uid: ''
            },
            authenticated: {
              status: false
            }
        });
        const { container } = render(<Provider store={store} ><CommentSection idDrink="11111"/></Provider>);
        expect(container.querySelector('.commentListTest')).toBeInTheDocument();
    });
});