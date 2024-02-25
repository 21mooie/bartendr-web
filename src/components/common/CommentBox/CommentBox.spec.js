import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { store as notificationsModule } from 'react-notifications-component';

import CommentBox from './CommentBox';
import { postCommentAsync } from '../../../async/comments/comments';

jest.mock( '../../../async/comments/comments');

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
                user: {
                    uid: ""
                },
                authenticated: {
                  status: false
                }
            });
        });

        afterEach(() => {
            mockPush.mockRestore();
        });

        it('should render.', () => {
            render(<Provider store={store} ><CommentBox idDrink="11111" parentId={null} updateComment={() => {}} /></Provider>);
            expect(screen.getByRole('textbox')).toBeInTheDocument();
            expect(screen.getAllByRole('button').length).toBe(2);
        });

        it('should redirect unauthenticated users on click.', () => {
            const { container } = render(<Provider store={store} ><CommentBox idDrink="11111" parentId={null} updateComment={() => {}} /></Provider>);
            userEvent.click(container.querySelector('.commentBox__cancel'));
            expect(mockPush).toHaveBeenCalledTimes(1);
        });

        it('should redirect unauthenticated users on click of text area.', () => {
            const { container } = render(<Provider store={store} ><CommentBox idDrink="11111" parentId={null} updateComment={() => {}} /></Provider>);
            userEvent.click(container.querySelector('.commentBox textarea'));
            expect(mockPush).toHaveBeenCalledTimes(1);
        });
    });

    describe('when authenticated', () => {
        let store;
        let comment;
        beforeAll(() => {
            store = mockStore({
                user: {
                    uid: 'testUid'
                },
                authenticated: {
                  status: true
                }
            });
            comment = 'Hello this is a comment';
            postCommentAsync.mockImplementation(() => Promise.resolve({"success": "SUCCESSFULLY_POST_COMMENTS"}));
        });

        it('should write content to screen.', () => {
            const { container } = render(<Provider store={store} ><CommentBox idDrink="11111" parentId={null} updateComment={() => {}} /></Provider>);
            const textarea = container.querySelector('.commentBox textarea');
            userEvent.type(textarea, comment);
            expect(textarea.value).toBe(comment);
        });
        
        it('should be able to submit content.', async () => {
            const { container } = render(<Provider store={store} ><CommentBox idDrink="11111" parentId={null} updateComment={() => {}} /></Provider>);
            const textarea = container.querySelector('.commentBox textarea');
            await act(async () => {
                await act(async () => {
                    userEvent.type(textarea, comment);
                    
                });
                const submitBtn = container.querySelector('.commentBox__submit');
                expect(submitBtn.disabled).toBe(false);
                userEvent.click(submitBtn);
            });
            expect(textarea.value).toBe('');
        });
    
        it('should be able to cancel after writing content.', () => {
            const { container } = render(<Provider store={store} ><CommentBox idDrink="11111" parentId={null} updateComment={() => {}} /></Provider>);
            const textarea = container.querySelector('.commentBox textarea');
            userEvent.type(textarea, comment);
            userEvent.click(container.querySelector('.commentBox__cancel'));
            expect(textarea.value).toBe('');
        });
    
        it('should not be able to submit an empty comment.', () => {
            const { container } = render(<Provider store={store} ><CommentBox idDrink="11111" parentId={null} updateComment={() => {}} /></Provider>);
            expect(container.querySelector('.commentBox__submit').disabled).toBe(true);
        });

        it('should handle a failed submission.', async () => {
            postCommentAsync.mockImplementationOnce(() => Promise.reject({"error": "FAILED_POST_COMMENTS"}));
            jest.spyOn(console, "error").mockImplementation(() => {});
            const { container } = render(<Provider store={store} ><CommentBox idDrink="11111" parentId={null} updateComment={() => {}} /></Provider>);
            const textarea = container.querySelector('.commentBox textarea');

            userEvent.type(textarea, comment);
                const submitBtn = container.querySelector('.commentBox__submit');
                userEvent.click(submitBtn);
            await act(async () => {
                
                
            });
            
            expect(notificationsModule.addNotification).toHaveBeenCalled();
        });
    
        it('should check for some malicious code.', () => {});
    });

});