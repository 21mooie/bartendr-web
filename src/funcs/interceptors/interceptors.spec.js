import { onFulfilled, onRejected } from "./interceptors";

import UserPool from '../../services/UserPool';

jest.mock('../history/history');

jest.mock('../../services/UserPool', () => ({
    getCurrentUser: jest.fn(() => ({
        getSession: jest.fn((callback) => (
            callback('error', null)
        )),
    })),
}));

describe('interceptors', () => {
    it('should correctly handle successful requests.', () => {
        expect(onFulfilled('hello world')).toEqual('hello world');
    });

    describe('should handle rejected responses', () => {
        let error;
        beforeEach(() => {
            error = {
                response: {
                    status: 401
                },
                config: {
                    retry: 1
                }
            }
        });
        it('by returning the error when it is not an authentication error.', async () => {
            onRejected({ response: { status: 500 }})
                .catch((resp) => {
                    expect(resp).toEqual({ response: { status: 500 }})
                });
        });
    });
});