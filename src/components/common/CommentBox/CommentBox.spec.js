import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import CommentBox from './CommentBox';

const mockStore = configureStore();
const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));
jest.mock('react-notifications-component', () => ({
    store: {
        addNotification: jest.fn(),
    },
}));

describe('CommentBox', () => {
    describe('when unauthenticated', () => {
        let store;
        beforeAll(() => {
            store = mockStore({
                authenticated: {
                  status: false
                }
            });
        });

        it('should render.', () => {
            render(<Provider store={store} ><CommentBox /></Provider>);
            expect(screen.getByRole('textbox')).toBeInTheDocument();
            expect(screen.getAllByRole('button').length).toBe(2);
        });

        it('should redirect unauthenticated users on click.', () => {
            const { container } = render(<Provider store={store} ><CommentBox /></Provider>);
            userEvent.click(container.querySelector('.commentBox__cancel'));
            expect(mockPush).toHaveBeenCalledTimes(1);
        });
    });

    describe('when authenticated', () => {
        let store;
        let comment;
        beforeAll(() => {
            store = mockStore({
                authenticated: {
                  status: true
                }
            });
            comment = 'Hello this is a comment';
        });

        it('should write content to screen.', () => {
            const { container } = render(<Provider store={store} ><CommentBox /></Provider>);
            const textarea = container.querySelector('.commentBox textarea');
            userEvent.type(textarea, comment);
            expect(textarea.value).toBe(comment);
        });
        
        it('should be able to submit content.', () => {
            const { container } = render(<Provider store={store} ><CommentBox /></Provider>);
            const textarea = container.querySelector('.commentBox textarea');
            userEvent.type(textarea, comment);
            expect(container.querySelector('.commentBox__submit').disabled).toBe(false);
        });
    
        it('should be able to cancel after writing content.', () => {
            const { container } = render(<Provider store={store} ><CommentBox /></Provider>);
            const textarea = container.querySelector('.commentBox textarea');
            userEvent.type(textarea, comment);
            userEvent.click(container.querySelector('.commentBox__cancel'));
            expect(textarea.value).toBe('');
        });
    
        it('should not be able to submit an empty comment.', () => {
            const { container } = render(<Provider store={store} ><CommentBox /></Provider>);
            expect(container.querySelector('.commentBox__submit').disabled).toBe(true);
        });
    
        it('should check for some malicious code.', () => {});
    });

});