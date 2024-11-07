import React from 'react';
import { render, screen } from '@testing-library/react';
import Explore from './Explore';

xdescribe('Explore', () => {
    it('should render.', () => {
        render(<Explore />);
        expect(screen.getByText('This is explore')).toBeInTheDocument();
    });
});