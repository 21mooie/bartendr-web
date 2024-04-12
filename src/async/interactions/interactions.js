import axios from 'axios';

import { url } from '../../consts';

const getInteractionsAsync = (type, uid, params) => {
    return new Promise((resolve, reject) => {
        const urlParams = new URLSearchParams();
        urlParams.append('type'   , type);
        urlParams.append('uid'    , uid);
        urlParams.append('idDrink', params.idDrink)
        for (const commentId of params.commentIds) {
            urlParams.append("commentIds", commentId);
        }
        axios.get(`${url}/interactions`, {
            params: urlParams
        }).then((response) => {
            resolve(response.data);
        }).catch((err) => {
            console.error(err);
            reject(err);
        });
    });
};

const postInteractionAsync = (type, idDrink, interaction, commentId, uid) => {
    return new Promise((resolve, reject) => {
        axios.post(`${url}/interactions`, {
            type,
            idDrink,
            interaction,
            commentId,
            uid
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((err) => {
            reject(err);
        });
    });
};

export  { getInteractionsAsync, postInteractionAsync };