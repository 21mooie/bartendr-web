import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './CommentList.css';
import Comment from '../../common/Comment/Comment';
import { url } from '../../../consts';

const CommentList = ({idDrink, limit}) => {
    // turn into CommentsList
    const [comments, setComments] = useState([]);
    const [offset, setOffset]   = useState('0');
    useEffect(() => {
        //TODO: should be done using redux
        axios.get(`${url}/cocktail/${idDrink}/comment`,{
            params: {
                offset,
                limit
            }
        })
            .then((result) => {
                const data = result.data.data;
                // console.log(data);
                setComments([...comments,...data]);
            })
            .catch((err) => {
                console.error(err);
                //TODO: create saga to trigger notification
            });
    }, []);
    return (
        <div className="commentList">
            <ul className="commentList__comments">
                { comments.length > 0 && comments.map((comment, index) => (<li key={index}><Comment commentData={comment}/></li>)) }
                { comments.length === 0 && <li>There are no comments. You can be the first!</li> }
            </ul>
        </div>
    );
}
 
export default CommentList;
