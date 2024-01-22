import React from 'react';
import { render, screen, waitForElement, wait } from '@testing-library/react';

import CommentList from './CommentList';
import commentsMock from '../../../mocks/comments.mock';
import { getCommentsAsync } from '../../../async/comments/comments';

jest.mock( '../../../async/comments/comments');

describe('CommentList', () => {
    beforeAll(() => {
        getCommentsAsync.mockImplementation(() => Promise.resolve(commentsMock.data))
    });

    it('should render.', async () => {
        render(<CommentList idDrink="11111" limit="10"/>);
        await waitForElement(() =>  {
            const list = screen.getAllByRole('listitem');
            if(list.length > 1) {
                expect(list.length).toBeGreaterThan(1);
                return true;
            }
            else {
                return false
            }
        });
    });

    it('should handle an error getting comments.', async () => {
        getCommentsAsync.mockImplementationOnce(() => Promise.reject('error'));
        // how to mock console
        const spy = jest.spyOn(console, "error").mockImplementation(() => {});
        render(<CommentList idDrink="11111" limit="10"/>);
        // how to wait for spies
        await wait(() => expect(spy).toHaveBeenCalled());
    });
});