import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound', () => {
    it('should render.', () => {
        render(<NotFound />);
        expect(screen.getByText('This is NotFound')).toBeInTheDocument();
    });
});