import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';

import CommentListRenderer from './CommentListRenderer';
import commentsMock from '../../../../mocks/comments.mock';

describe('CommentListRenderer', () => {

    beforeAll(() => {
        mockIntersectionObserver();
    });

    it('should render.', () => {
        const { container } = render(<CommentListRenderer comments={commentsMock.results} refProp={null}/>)
        expect(container.querySelector('.comment')).toBeInTheDocument();
    });

    it('should render no comments.', () => {
        render(<CommentListRenderer comments={[]} refProp={null}/>)
        expect(screen.getByText('There are no comments. You can be the first!')).toBeInTheDocument();
    });
    
});