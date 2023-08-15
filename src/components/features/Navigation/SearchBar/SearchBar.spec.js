import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
    it('should render.', () => {
        const { container } = render(<SearchBar show={true} />);
        expect(container.querySelector('.search_bar')).toBeInTheDocument();
    });

    it('should render full search bar.', () => {
        const { container } = render(<SearchBar show={true} showFullSearchBar={true}/>);
        expect(container.querySelector('.search_bar__full_flex')).toBeInTheDocument();
    });

    it('should trigger a function when clicking ChevronLeftIcon on full search bar.', () => {
        const mockFn = jest.fn();
        const { container } = render(<SearchBar show={true} showFullSearchBar={true} toggleFullSearchBar={mockFn} smallScreen={true}/>);
        fireEvent.click(container.querySelector('.search_bar__small_screen svg'));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should trigger a function when clicking SearchIcon.', () => {
        const mockFn = jest.fn();
        const { container } = render(<SearchBar show={true} toggleFullSearchBar={mockFn} smallScreen={true}/>);
        fireEvent.click(container.querySelector('.search_bar svg'));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should trigger a function when clicking search button.', () => {
        const mockFn = jest.fn();
        render(<SearchBar show={true} toggleFullSearchBar={mockFn} performSearch={mockFn}/>);
        fireEvent.click(screen.getByRole('button'));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should change the value of the search a user enters a new input.', () => {
        const mockFn = jest.fn();
        render(<SearchBar show={true} toggleFullSearchBar={mockFn} setSearchVal={mockFn}/>);
        fireEvent.change(screen.getByRole('textbox'), {target: {value: 'mango'}});
        expect(mockFn).toHaveBeenCalledWith('mango');
        ;
    });

    it('should trigger a function when clicking search button.', () => {
        const mockFn = jest.fn();
        render(<SearchBar show={true} toggleFullSearchBar={mockFn} performSearch={mockFn}/>);
        fireEvent.click(screen.getByRole('button'));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});