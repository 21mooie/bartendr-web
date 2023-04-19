import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CTAButton from './CTAButton';


describe('CTAButton', () => {
    test('should render given text.', () => {
        render(<CTAButton text="Click Me!" icon={true} func={() => console.log('Hello World!')}/>);
        // how to see component html
        // screen.debug();
        const linkElement = screen.getByText("Click Me!");
        expect(linkElement).toBeInTheDocument();
    });
    
    test('should render button.', () => {
        render(<CTAButton text="Click Me!" icon={true} func={() => console.log('Hello World!')}/>);
        // how to see all roles on page
        // screen.getByRole('');
        expect(screen.getByRole("button")).toBeInTheDocument();
    });
    
    test('should render icon.', () => {
        render(<CTAButton text="Click Me!" icon={true} func={() => console.log('Hello World!')}/>);
        expect(screen.getByTitle("arrow")).toBeInTheDocument();
    });

    test('should not render icon.', () => {
        render(<CTAButton text="Click Me!" icon={false} func={() => console.log('Hello World!')}/>);
        expect(screen.queryByTitle("arrow")).toBeNull();
    });

    test('should trigger a function when clicked.', () => {
        const callback = jest.fn();
        render(<CTAButton text="Click Me!" icon={true} func={callback} />);
        userEvent.click(screen.getByText("Click Me!"));
        expect(callback).toHaveBeenCalledTimes(1);
    });
});

