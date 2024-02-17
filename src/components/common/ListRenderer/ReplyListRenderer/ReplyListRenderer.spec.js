import React from 'react';
import { render, screen } from '@testing-library/react';

import ReplyListRenderer from './ReplyListRenderer';
import commentsMock from '../../../../mocks/comments.mock';



describe('ReplyListRenderer', () => {
    it('should render.', () => {
        const { container } = render(<ReplyListRenderer replies={commentsMock.results} />);
        expect(container.querySelector('.comment')).toBeInTheDocument();
    });

    it('should render no replies.', () => {
        const { container } = render(<ReplyListRenderer replies={[]} />);
        expect(screen.getByText('There are no replies. Please submit an error ticket!')).toBeInTheDocument();
    });
});