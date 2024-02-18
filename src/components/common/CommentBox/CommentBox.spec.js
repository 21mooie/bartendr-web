import React from 'react';
import { render, screen } from '@testing-library/react';

describe('CommentBox', () => {
    it('should render.', () => {
        expect(render(<CommentBox />)).ToBeInTheDocument();
    });
});