import axios from 'axios';
import { store } from 'react-notifications-component';

import { url } from '../../consts';

const getCommentsAsync = ({idDrink, offset, limit, parentId}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${url}/cocktail/${idDrink}/comment`,{
            params: {
                offset,
                limit
            }
        })
        .then((result) => {
            const data = result.data.data;
            resolve(data);
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

export { getCommentsAsync };