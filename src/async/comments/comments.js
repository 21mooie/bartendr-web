import axios from 'axios';
import { store } from 'react-notifications-component';

import { url } from '../../consts';

const getCommentsAsync = ({idDrink, offset, limit, parentId}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${url}/cocktail/${idDrink}/comment`,{
            params: {
                offset,
                limit,
                parentId
            }
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((err) => {
            console.error(err);
            store.addNotification({
                title: "Uh-oh!",
                message: "This action cannot be completed at this time. Try again later.",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3500,
                    onScreen: true
                }
            });
            reject(err);
        });
    });
}

const postCommentAsync = (uid, idDrink, parentId, comment) => {
    if(validateComment(comment)) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/cocktail/${idDrink}/comment`,{
                content: comment,
                replyTo: parentId,
                uid
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => {
                console.error(err);
                store.addNotification({
                    title: "Uh-oh!",
                    message: "This action cannot be completed at this time. Try again later.",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 3500,
                        onScreen: true
                    }
                });
                reject(err);
            });
        });
    }
    return new Promise((resolve, reject) => reject('Cannot Validate Comment'));
};

const validateComment = (comment) => {
    //TODO: Check for malicious comments, maybe a service to check for things
    if(!comment || comment === '') {
        store.addNotification({
            title: "Hey!",
            message: "You cannot post an empty comment",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 3500,
                onScreen: true
            }
        });
        return false;
    }
    return true;
};

export { getCommentsAsync, postCommentAsync };