import React from 'react';
import { render, screen } from '@testing-library/react';
import EditUserInfo from './EditUserInfo';

jest.mock('./UserInfoForm/UserInfoForm', () => () => <div>UserInfoForm</div>);

describe('EditUserInfo', () => {
    it('should render.', () => {
        render(<EditUserInfo viewingCurrentUserProfile={true} editInfoProp={false} />);
        expect(screen.getByText('Edit info')).toBeInTheDocument();
    });

    it('should render <UserInfo />.', () => {
        render(<EditUserInfo viewingCurrentUserProfile={true} editInfoProp={true} />);
        expect(screen.getByText('UserInfoForm')).toBeInTheDocument();
    });

    it('should not render when not viewing the current user\'s profile.', () => {
        const { container } = render(<EditUserInfo viewingCurrentUserProfile={false} editInfoProp={false} />);
        const div = container.querySelector('div');
        expect(div).toBe(null);
    });
});