import React from 'react';
import { render, screen } from '@testing-library/react';

import UserFollowButton from "./UserFollowButton";

describe('UserFollowButton', () => {
    it('should render.', () => {
        render(<UserFollowButton viewingCurrentUserProfile={false} alreadyFollowing={true}/>);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should not render any elements when viewing current user\'s profile.', () => {
        const { container } = render(<UserFollowButton viewingCurrentUserProfile={true} />);
        const div = container.querySelector('.userFollowButton');
        // deprecated matcher jest-dom
        expect(div).toBeEmpty();
    });

    it('should render Follow button when a user is not already following someone.', () => {
        render(<UserFollowButton viewingCurrentUserProfile={false} alreadyFollowing={false} />);
        expect(screen.getByText('Follow')).toBeInTheDocument();
    });
});