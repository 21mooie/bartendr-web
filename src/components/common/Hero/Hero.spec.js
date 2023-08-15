import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import { useHistory } from "react-router-dom";

import Hero from './Hero';

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockPush
    })
}));

describe('Hero', () => {
    it('should render.', () => {
        render(<Hero />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should navigate to login page after clicking button.', () => {
        render(<Hero />);
        fireEvent.click(screen.getByRole('button'));
        expect(mockPush).toHaveBeenCalled();
    });
});