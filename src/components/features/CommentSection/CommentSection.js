import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './CommentSection.css';
import {url} from "../../../consts";
import Comment from '../../common/Comment/Comment';

const CommentSection = ({idDrink, limit}) => {
    const [comments, setComments] = useState([]);
    const [offset, setOffset]   = useState('0');
    useEffect(() => {
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
                // create saga to trigger notification
                // notification
            });
    }, []);
    return (
        <div className="commentSection">
            <ul className="commentSection__comments">
                { comments.length > 0 && comments.map((comment, index) => (<li key={index}><Comment commentData={comment}/></li>)) }
                { comments.length === 0 && <li>There are no comments. You can be the first!</li> }
            </ul>
        </div>
        
    );
}
 
export default CommentSection;
