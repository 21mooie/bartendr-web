import { getAuthToken, setAuthToken } from "./authtoken";
import axios from 'axios';

jest.mock('axios', () => ({
    defaults: {
        headers: {
            common: {
                Authorization: ''
            }
        }
    }
}));

describe('authtoken', () => {
    beforeEach(() => {
        localStorage.setItem('CognitoIdentityServiceProvider.39prti75ukn9no85f7n1i1l34c.LastAuthUser', 'test1');
        localStorage.setItem('CognitoIdentityServiceProvider.39prti75ukn9no85f7n1i1l34c.test1.idToken', 'token1');
    });
    it('should get auth token.', () => {
        expect(getAuthToken()).toEqual('token1');
    });

    it('should set token in header.', () => {
        setAuthToken();
        expect(axios.defaults.headers.common.Authorization).toEqual('Bearer token1');
    });

    it('should not set token in header when not in local storage.', () => {
        localStorage.removeItem('CognitoIdentityServiceProvider.39prti75ukn9no85f7n1i1l34c.test1.idToken');
        setAuthToken();
        expect(axios.defaults.headers.common).toEqual({});
    });
});