import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import ScrollToBottomListener from './ScrollToBottomListener';

describe('ScrollListener ', () => {
    it('should call calback when scrolled to bottom of screen.', () => {
        const mock = jest.fn();
        render(<ScrollToBottomListener bottomReachedCallback={mock}/>);
        fireEvent.scroll(window, {target: { scrollY: 10000 }});
        expect(mock).toHaveBeenCalled();
    });
});