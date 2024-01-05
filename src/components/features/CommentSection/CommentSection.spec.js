import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';
import axios from 'axios';

import CommentSection from './CommentSection';
import commentsMock from '../../../mocks/comments.mock';

jest.mock('axios');

describe('CommentSection', () => {
    beforeAll(() => {
        axios.get.mockImplementation(() => Promise.resolve({
            "data": commentsMock,
        }));
    });

    test('should render.', async () => {
        render(<CommentSection idDrink="11111" limit="10"/>);
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

    test('should handle an error getting comments.', async () => {
        axios.get.mockImplementation(() => Promise.reject({
            "error": "FAILURE",
        }));
        jest.spyOn(console, "error").mockImplementation(() => {});
        render(<CommentSection idDrink="11111" limit="10"/>);
        await waitForElement(() => {
            screen.getAllByRole('listitem');
            return true;
        });
    });
});