import React from 'react';
import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import UserPool from '../../../services/UserPool';

import AutoLogin from './AutoLogin';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch
}));

jest.mock('../../../services/UserPool');
jest.spyOn(console, "log").mockImplementation(() => {});

describe('AutoLogin', () => {
    it('should render.', () => {
        UserPool.getCurrentUser.mockImplementation(() => null)
        const { container } = render(<AutoLogin />);
        expect(container.querySelector('div')).not.toBeInTheDocument();
    });

    it('should autologin user.', () => {
        const mockGetUsername = jest.fn();
        
        UserPool.getCurrentUser.mockImplementation(() => ({
            getUsername: mockGetUsername
        }));
        render(<AutoLogin />);
        expect(mockGetUsername).toHaveBeenCalledTimes(1);
    });
});