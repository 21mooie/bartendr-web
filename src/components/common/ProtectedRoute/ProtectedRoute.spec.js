import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { store } from '../../../store/store';

import ProtectedRoute from './ProtectedRoute';

jest.mock('../../../store/store', () => ({
    store: {
        getState: () =>  ({
            authenticated: {
                status: true
            }
        })
    }
}));

// to mock default import
// jest.mock('../../../store/store', () => ({
//     default: jest.fn()
// }));

describe('ProtectedRoute', () => {
    it('should render.', () => {
        const { container } = render(<MemoryRouter><ProtectedRoute component=""/></MemoryRouter>);
        expect(container.querySelector('div')).not.toBeInTheDocument();
    });

    it('should redirect if user is unauthenticated.', () => {
        store.getState = () => ({ authenticated: { status: false }});
        const { container } = render(<MemoryRouter><ProtectedRoute /></MemoryRouter>);
        expect(container.querySelector('div')).not.toBeInTheDocument();
    });
});