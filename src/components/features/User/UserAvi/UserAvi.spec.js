import React from 'react';
import { render, screen } from '@testing-library/react';
import UserAvi from './UserAvi';

describe('UserAvi', () => {
    test('should render.', () => {
        render(<UserAvi avi="./example.jpg" username="test" />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', './example.jpg');
    });
    test('should render empty account when no valid avi is passed.', () => {
        const { container } = render(<UserAvi avi={null}/>);
        const svg = container.querySelector('.MuiSvgIcon-root');
        // toHaveAttribute comes from jest-dom which has many useful matchers
        expect(svg).toHaveAttribute('focusable', 'false');
    });
});