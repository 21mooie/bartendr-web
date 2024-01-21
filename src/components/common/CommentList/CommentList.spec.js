import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';
import axios from 'axios';

import CommentList from './CommentList';
import commentsMock from '../../../mocks/comments.mock';

jest.mock('axios');

describe('CommentList', () => {
    beforeAll(() => {
        axios.get.mockImplementation(() => Promise.resolve({
            "data": commentsMock,
        }));
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
        axios.get.mockImplementation(() => Promise.reject({
            "error": "FAILURE",
        }));
        jest.spyOn(console, "error").mockImplementation(() => {});
        render(<CommentList idDrink="11111" limit="10"/>);
        await waitForElement(() => {
            screen.getAllByRole('listitem');
            return true;
        });
    });
});