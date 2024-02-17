import axios from 'axios';
import { store } from 'react-notifications-component';

import { getCommentsAsync } from './comments';
import commentsMock from '../../mocks/comments.mock';


jest.mock('axios');

jest.mock('react-notifications-component', () => ({
    store: {
        addNotification: jest.fn(),
    },
}))

describe('comments', () => {
    beforeAll(() => {
        axios.get.mockImplementation(() => Promise.resolve({
            "data": commentsMock,
        }));
    });

    it('should be succesful.', async () => {
        getCommentsAsync({idDrink: '11111', offset: '0', limit: 10, parentId: null})
            .then((data) => expect(data.results.length).toBe(10))
    });

    it('should handle an error getting comments.', async () => {
        axios.get.mockImplementation(() => Promise.reject({
            "error": "FAILURE",
        }));
        const spy = jest.spyOn(console, "error").mockImplementation(() => {});
        getCommentsAsync({idDrink: '11111', offset: '0', limit: 10, parentId: null})
            .then((data) => {})
            .catch((err) => expect(spy).toHaveBeenCalled())
    });
});