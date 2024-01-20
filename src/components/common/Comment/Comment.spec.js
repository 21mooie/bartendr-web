import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';
import Comment from './Comment';

describe('Comment', () => {
    test('should render.', () => {
        const commentData = {
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
        render(<Comment commentData={commentData} />);
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    test('should show empty avatar when no avi is present.', () => {
        const commentData = {
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
            "commenterAvi": ""
        };
        const { container } = render(<Comment commentData={commentData} />);
        expect(container.querySelector('.MuiAvatar-root')).toBeInTheDocument();
    });
});
