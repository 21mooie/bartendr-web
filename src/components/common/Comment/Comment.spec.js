import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import Comment from './Comment';
import { getCommentsAsync } from '../../../async/comments/comments';
import commentsMock from '../../../mocks/comments.mock';

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
        getCommentsAsync.mockImplementation(() => Promise.resolve(commentsMock))
    });
    it('should render.', () => {
        render(<Comment commentData={commentData} />);
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('should show empty avatar when no avi is present.', () => {
        const commentData1 = {...commentData};
        commentData1.commenterAvi = "";
        const { container } = render(<Comment commentData={commentData1} />);
        expect(container.querySelector('.MuiAvatar-root')).toBeInTheDocument();
    });

    it('should show replies when the button is clicked.', async () => {
        const commentData1 = {...commentData};
        commentData1.hasReplies = true;
        const { container } = render(<Comment commentData={commentData1} />);
        await act(async () => {
            expect(container.querySelector('.comment__showReplies_dropUp')).toBeInTheDocument();
            userEvent.click(container.querySelector('.comment__showReplies'));
        });
        expect(container.querySelector('.comment__showReplies_dropDown')).toBeInTheDocument();        
    });

    it('should show CommentBox when Reply Button is clicked.', () => {
        const { container } = render(<Comment commentData={commentData} />);
        userEvent.click(container.querySelector('.comment__interactions_reply'));
        expect(container.querySelector('.commentBox')).toBeInTheDocument();
    });

    it('should update replies when a reply is made.', () => {
        const { container } = render(<Comment commentData={commentData} />);
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
                const { container } = render(<Comment commentData={commentDataWithReplies} />);
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
            const { container } = render(<Comment commentData={commentDataWithReplies} />);
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
            const { container } = render(<Comment commentData={commentDataWithReplies} />);
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

    
});
