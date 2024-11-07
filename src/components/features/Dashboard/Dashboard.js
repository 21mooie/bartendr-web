import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WithLoading         from '../../common/WithLoading/WithLoading';
import CommentListRenderer from '../../common/ListRenderer/CommentListRenderer/CommentListRenderer';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import './Dashboard.css';
import { getExploreAsync } from '../../../async/explore/explore';
import CommentBox from '../../common/CommentBox/CommentBox';
import { url } from '../../../consts';

const CommentListRendererWithLoading = WithLoading(CommentListRenderer);

export const Dashboard = () => {
  const uid                                   = useSelector((state) => state.user.uid);
  const username                              = useSelector((state) => state.user.username);
  const [limit, setLimit]                     = useState(10);
  const [comments, setComments]               = useState([]);
  const [initialLoad, setInitialLoad ]        = useState(true);
  const [loading,  setLoading]                = useState(false);
  const [requestComments, setRequestComments] = useState(true);
  const [drinkSuggestion, setDrinkSuggestion] = useState(null);
  const [drinkSuggestionRequested, setDrinkSuggestionRequested] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (uid && requestComments)
      getExploreAsync(uid, limit)
        .then(data => {
          setRequestComments(false);
          setComments([...comments, ...data.results]);
        }).catch(err => console.error(err))
        .finally(() => {
          setLoading(false);
          setInitialLoad(false);
        });
    if (drinkSuggestionRequested && !drinkSuggestion){
      setDrinkSuggestionRequested(false);
      getCocktail();
    }
  }, [uid, limit, requestComments, comments, drinkSuggestion, drinkSuggestionRequested]);


  const updateComment = (idx, update) => {
    comments[idx] = {...comments[idx], ...update};
    setComments([...comments]);
  };

  function getCocktail() {
    axios.get(`${url}/cocktail`).then((response) => {
       console.log(response.data['drinks'][0]);
       setDrinkSuggestion(response.data['drinks'][0]);
    }).catch((err) => {
      console.error(err);
    });
  }

  return (
    <div className="dashboard">
      {
        drinkSuggestion &&
        <>
          <h2 className="dashboard__header">Your drink recommendation!</h2>
          {/* <ConnectedDrinkCard drink={drinkSuggestion} /> */}
          <div className="drink__imageNTitle">
            <div className="drink__image" onClick = {() => history.push({pathname: `/drink/${drinkSuggestion.idDrink}`})
            }>
              <img src={drinkSuggestion.strDrinkThumb} alt={`${drinkSuggestion.strDrink}`}/>
            </div>
            <div className="drink__info">
                <h3 className="drink__title">{drinkSuggestion.strDrink}</h3>
                <p>Type: {drinkSuggestion.strAlcoholic}</p>
                <p>Category: {drinkSuggestion.strCategory}</p>
              </div>
          </div>
        </>
      }
      <h3 className="dashboard__title">How are you feeling {username}?</h3>
      <CommentBox 
        parentId={null}
        updateComment={(commentResponse) => setComments([commentResponse.comment, ...comments])}
        isReplyBox={false}
        statusId={null}
        commentType='STATUS'
        statusOwnerUid={uid}
      />
      <CommentListRendererWithLoading
      comments={comments}
      isLoading={loading || initialLoad}
      initialLoad={initialLoad}
      bottomReachedCallback={() => setRequestComments(true)}
      updateComment={updateComment}
      />
    </div>
  );
}

export default Dashboard;
