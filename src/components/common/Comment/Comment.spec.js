import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { store as notificationsModule } from 'react-notifications-component';

import Comment from './Comment';
import { getCommentsAsync } from '../../../async/comments/comments';
import commentsMock from '../../../mocks/comments.mock';
import { postInteractionAsync } from '../../../async/interactions/interactions';

const mockStore = configureStore([]);
const mockPush = jest.fn();

jest.mock( '../../../async/comments/comments');
jest.mock('../CommentBox/CommentBox',
() => ({updateComment}) => <div className='commentBox'>
                                Comment Box
                                <button
                                    className='commentBox__button'
                                    onClick={() => updateComment({
                                        "commentId": "f8dkj3m979a92734c307e51",
                                        "content": "This is the updated reply",
                                        "parentId": null,
                                        "commenterUid": "7c0b82f1-835b-42b0-912d-ba893562f2f4",
                                        "idDrink": "178332",
                                        "dateTimeCreated": "2023-12-18T13:36:42.051Z",
                                        "numLikes": 0,
                                        "numDislikes": 0,
                                        "hasReplies": false,
                                        "commenterUsername": "muata01092021",
                                        "commenterAvi": "https://real-image-url.com"
                                    })}
                                >
                                    Click Me
                                </button>
                            </div>);
jest.mock('../../../async/interactions/interactions');

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

describe('Comment', () => {
    let commentData;
    let store;
    beforeAll(() => {
        store = mockStore({
            user: {
                uid: 'uid123',
                username: 'test_username',
            },
            authenticated: {
                status: true
            }
        });
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
        getCommentsAsync.mockImplementation(() => Promise.resolve(commentsMock))
    });
    it('should render.', () => {
        render(<Provider store={store} ><Comment commentData={commentData} /></Provider>);
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('should show empty avatar when no avi is present.', () => {
        const commentData1 = {...commentData};
        commentData1.commenterAvi = "";
        const { container } = render(<Provider store={store} ><Comment commentData={commentData1} /></Provider>);
        expect(container.querySelector('.MuiAvatar-root')).toBeInTheDocument();
    });

    it('should show replies when the button is clicked.', async () => {
        const commentData1 = {...commentData};
        commentData1.hasReplies = true;
        const { container } = render(<Provider store={store} ><Comment commentData={commentData1} /></Provider>);
        await act(async () => {
            expect(container.querySelector('.comment__showReplies_dropUp')).toBeInTheDocument();
            userEvent.click(container.querySelector('.comment__showReplies'));
        });
        expect(container.querySelector('.comment__showReplies_dropDown')).toBeInTheDocument();        
    });

    it('should show CommentBox when Reply Button is clicked.', () => {
        const { container } = render(<Provider store={store} ><Comment commentData={commentData} /></Provider>);
        userEvent.click(container.querySelector('.comment__interactions_reply'));
        expect(container.querySelector('.commentBox')).toBeInTheDocument();
    });

    it('should update replies when a reply is made.', () => {
        const { container } = render(<Provider store={store} ><Comment commentData={commentData} /></Provider>);
        userEvent.click(container.querySelector('.comment__interactions_reply'));
        userEvent.click(container.querySelector('.commentBox__button'));
        expect(container.querySelector('.replyListRenderer__replies .comment__content').innerHTML).toBe("This is the updated reply");
    });

    describe('when it has replies', () => {
        let commentDataWithReplies;
        beforeAll(() => {
            commentDataWithReplies = {...commentData};
            commentDataWithReplies.hasReplies = true;
        });

        it('should show replies when requested.', async () => {
            await act(async () => {
                const { container } = render(<Provider store={store} ><Comment commentData={commentDataWithReplies} /></Provider>);
                expect(container.querySelector('.replyListRenderer')).not.toBeInTheDocument();
                userEvent.click(container.querySelector('.comment__showReplies'));
            });
            await waitForElement(() => {
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

        it('should hide replies when requested.', async () => {
            const { container } = render(<Provider store={store} ><Comment commentData={commentDataWithReplies} /></Provider>);
            await act(async () => {
                expect(container.querySelector('.replyListRenderer')).not.toBeInTheDocument();
                userEvent.click(container.querySelector('.comment__showReplies'));
            });
            expect(container.querySelector('.comment__replies')).toBeInTheDocument();
            
        });

        it('should not send a new request for replies once replies are hidden then rerequested.', () => {
            //TODO finish test
        });

        it('if there are more than the paginated number of replies a show more replies option should be shown.', async () => {
            const { container } = render(<Provider store={store} ><Comment commentData={commentDataWithReplies} /></Provider>);
            let showMoreBtn;
            await act(async () => {
                await act(async () => {
                    userEvent.click(container.querySelector('.comment__showReplies'));
                });
                getCommentsAsync.mockImplementationOnce(() => Promise.resolve({
                    results: commentsMock.results,
                    endOfData: true
                }));
                showMoreBtn = container.querySelector('.comment__showMoreReplies');
                expect(showMoreBtn).toBeInTheDocument();
                userEvent.click(showMoreBtn);
            });
            expect(showMoreBtn).not.toBeInTheDocument();
        });
    });
    
    describe('when an interaction is clicked', () => {
        it('should handle the interaction.', async () => {
            postInteractionAsync.mockImplementationOnce(() => Promise.resolve({}));
            const { container } = render(<Provider store={store} ><Comment commentData={commentData} /></Provider>);
            await act(async () => {
                userEvent.click(container.querySelector('.comment__interactions svg'));
            });
            expect(container.querySelector('.comment__interactions_likeCount').innerHTML).toBe('1');
        });

        it('should not count the same interaction twice.', async () => {
            postInteractionAsync.mockImplementationOnce(() => Promise.resolve({}));
            const { container } = render(<Provider store={store} ><Comment commentData={commentData} /></Provider>);
            await act(async () => {
                userEvent.click(container.querySelectorAll('.comment__interactions svg')[1]);
            });
            expect(container.querySelector('.comment__interactions_likeCount').innerHTML).toBe('-1');
            await act(async () => {
                userEvent.click(container.querySelectorAll('.comment__interactions svg')[1]);
            });
            expect(container.querySelector('.comment__interactions_likeCount').innerHTML).toBe('-1');
        });

        it('should redirect an unauthorized user.', async () => {
            postInteractionAsync.mockImplementationOnce(() => Promise.resolve({}));
            const testStore = mockStore({
                user: {
                    uid: 'uid123',
                    username: 'test_username',
                },
                authenticated: {
                    status: false,
                }
            });
            const { container } = render(<Provider store={testStore} ><Comment commentData={commentData} /></Provider>);
            await act(async () => {
                userEvent.click(container.querySelector('.comment__interactions svg'));
            });
            expect(notificationsModule.addNotification).toHaveBeenCalled();
            expect(mockPush).toHaveBeenCalled();
        });

        it('should handle an error.', async () => {
            const spy = jest.spyOn(console, "error").mockImplementation(() => {});
            postInteractionAsync.mockRejectedValueOnce(() => Promise.reject({}));
            const { container } = render(<Provider store={store} ><Comment commentData={commentData} /></Provider>);
            await act(async () => {
                userEvent.click(container.querySelector('.comment__interactions svg'));
            });
            expect(spy).toHaveBeenCalled();
        });
    });
    
});
