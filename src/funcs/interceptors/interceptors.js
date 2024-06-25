import axios from 'axios';

import UserPool from '../../services/UserPool';
import history from '../history/history';
import {getAuthToken, setAuthToken} from '../authtoken/authtoken';

// TODO: Look into making this only apply to my request to api server
function sendToLogin(error) {
    localStorage.clear();
    history.push({pathname: '/login'});
    window.location.reload();
    return Promise.reject(error);
}

const onFulfilled = (response) => response;

const onRejected = (error) => {
    if (error.response.status === 401) {
        const { config } = error;
        if (!config || !config.retry)
            sendToLogin(error);

        const cognitoUser = UserPool.getCurrentUser();
        if (cognitoUser !== null) {
            cognitoUser.getSession(function (err, session) {
                if (err || !session)
                    sendToLogin(error);
                // session can still be valid if there is error
                console.log('session validity: ' + session.isValid());
                // id and access token are refreshing; refresh token is not
                // refresh token could refresh after 30 days; would need to test after 30 days; may do in future
                cognitoUser.refreshSession(session.getRefreshToken(), (err, newSession) => {
                    if (err)
                        sendToLogin(error);
                    setAuthToken();
                    config.headers.Authorization =  `Bearer ${getAuthToken()}`;
                    config.retry -= 1;
                    return new Promise((resolve) => {
                        setTimeout(() => {
                          console.log("retry the request", config.url);
                          resolve();
                        }, config.retryDelay || 1000);
                    }).then(() => axios(config));
                });
                
            });
        } else {
            sendToLogin(error);
        }
        return error;
    }
    return Promise.reject(error);
};

axios.interceptors.response.use(onFulfilled, onRejected);

export { onFulfilled, onRejected };