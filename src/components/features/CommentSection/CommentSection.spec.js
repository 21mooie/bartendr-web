import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';

import CommentSection from './CommentSection';

jest.mock('../../common/CommentList/CommentList', () => () => <div className="commentListTest">Comment List</div>);

describe('CommentSection', () => {
    test('should render.', async () => {
        const { container } = render(<CommentSection idDrink="11111"/>);
        expect(container.querySelector('.commentListTest')).toBeInTheDocument();
    });
});