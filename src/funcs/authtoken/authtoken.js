import axios from 'axios';

function getAuthToken() {
  const username = localStorage.getItem(`CognitoIdentityServiceProvider.39prti75ukn9no85f7n1i1l34c.LastAuthUser`);
  const answer = localStorage.getItem(`CognitoIdentityServiceProvider.39prti75ukn9no85f7n1i1l34c.${username}.idToken`)
  return answer;
}

function setAuthToken() {
    axios.defaults.headers.common['Authorization'] = '';
    delete axios.defaults.headers.common['Authorization'];
    const username = localStorage.getItem(`CognitoIdentityServiceProvider.39prti75ukn9no85f7n1i1l34c.LastAuthUser`);
    const token = localStorage.getItem(`CognitoIdentityServiceProvider.39prti75ukn9no85f7n1i1l34c.${username}.idToken`);
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

export  { getAuthToken, setAuthToken };