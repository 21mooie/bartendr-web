import React from 'react';
import { render, screen } from '@testing-library/react';

import WithLoading from './WithLoading';


describe('WithLoading', () => {
    let Component, ComponentWithLoading;
    beforeAll(() => {
        Component = () => (<p>Hello World</p>);
        ComponentWithLoading = WithLoading(Component);
    });

    it('should render.', () => {
        render(<ComponentWithLoading isLoading={false} />);
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('should render loading if data is still loading.', () => {
        const { container } = render(<ComponentWithLoading isLoading={true} />);
        expect(container.querySelector('.MuiCircularProgress-svg')).toBeInTheDocument();
    });
});