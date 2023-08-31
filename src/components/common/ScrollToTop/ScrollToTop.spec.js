import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ScrollToTop from './ScrollToTop';

describe('ScrollToTop', () => {
    it('should render.', () => {
        const { container } = render(<MemoryRouter><ScrollToTop /></MemoryRouter>);
        expect(container.querySelector('div')).not.toBeInTheDocument();
    });

    it('should scroll to top on route change.', () => {
        const TestComponent = () => {
            const history = useHistory();
            return (
                <button onClick={() => (history.push('/forward'))}>
                </button>
            )
        };
        const { container } = render(
        <MemoryRouter>
            <ScrollToTop />
            <TestComponent />
        </MemoryRouter>);
        fireEvent.click(screen.getByRole('button'));
        expect(container.querySelector('div')).not.toBeInTheDocument();
    });
});