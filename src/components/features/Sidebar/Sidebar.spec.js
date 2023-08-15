import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";


import Sidebar from './Sidebar';

// import MemoryRouter for test cases where you see this error
// Invariant failed: You should not use .... outside a <Router>
describe('Sidebar', () => {
    it('should render.', () => {
        render(<MemoryRouter><Sidebar isOpen={true}/></MemoryRouter>);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('should be closed when the props to close are passed.', () => {
        const { container } = render(<MemoryRouter><Sidebar isOpen={false} /></MemoryRouter>);
        const div = container.querySelector('.sideBar--hideSidebar');
        expect(div).toBeInTheDocument();
    });

    it('should launch function after CloseIcon is clicked.', () => {
        // how to mock triggering a function after user click
        const mockFn = jest.fn();
        const { container } = render(<MemoryRouter><Sidebar isOpen={true} triggerCloseSidebar={mockFn}/></MemoryRouter>);
        const svg = container.querySelector('.sideBar__cancel svg');
        fireEvent.click(svg);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should launch function after Dashboard is clicked.', () => {
        const mockFn = jest.fn();
        render(<MemoryRouter><Sidebar isOpen={true} triggerCloseSidebar={mockFn}/></MemoryRouter>);
        fireEvent.click(screen.getByText('Dashboard'));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should launch function after User is clicked.', () => {
        const mockFn = jest.fn();
        render(<MemoryRouter><Sidebar isOpen={true} triggerCloseSidebar={mockFn}/></MemoryRouter>);
        fireEvent.click(screen.getByText('User'));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should launch function after Explore is clicked.', () => {
        const mockFn = jest.fn();
        render(<MemoryRouter><Sidebar isOpen={true} triggerCloseSidebar={mockFn}/></MemoryRouter>);
        fireEvent.click(screen.getByText('Explore'));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should launch function after Sign Out is clicked.', () => {
        const mockFn = jest.fn();
        const mockFn2 = jest.fn();
        render(<MemoryRouter><Sidebar isOpen={true} triggerCloseSidebar={mockFn} triggerLogout={mockFn2}/></MemoryRouter>);
        fireEvent.click(screen.getByText('Sign Out'));
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn2).toHaveBeenCalledTimes(1);
    });

    // test('calls onClick prop when clicked', () => {
    //     const handleClick = jest.fn()
    //     render(<Button onClick={handleClick}>Click Me</Button>)
    //     fireEvent.click(screen.getByText(/click me/i))
    //     expect(handleClick).toHaveBeenCalledTimes(1)
    //   })
});