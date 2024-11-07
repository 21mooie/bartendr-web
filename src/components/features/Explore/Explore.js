import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './Explore.css';
import { getExploreAsync } from '../../../async/explore/explore';
import WithLoading         from '../../common/WithLoading/WithLoading';
import CommentListRenderer from '../../common/ListRenderer/CommentListRenderer/CommentListRenderer';

const CommentListRendererWithLoading = WithLoading(CommentListRenderer);

function Explore(props) {
  const uid                                   = useSelector((state) => state.user.uid);
  const [limit, setLimit]                     = useState(10);
  const [comments, setComments]               = useState([]);
  const [initialLoad, setInitialLoad ]        = useState(true);
  const [loading,  setLoading]                = useState(false);
  const [requestComments, setRequestComments] = useState(true);

  useEffect(() => {
    if (uid && requestComments)
      getExploreAsync(uid, limit)
        .then(data => {
          console.log(data);
          setComments([...comments, ...data.results]);
        }).catch(err => console.error(err))
        .finally(() => {
          setLoading(false);
          setInitialLoad(false);
          setRequestComments(false);
        });
  }, [uid, limit, requestComments]);

  const updateComment = (idx, update) => {
    comments[idx] = {...comments[idx], ...update};
    setComments([...comments]);
  };
  return (
    <div className="explore">
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

export default Explore;
