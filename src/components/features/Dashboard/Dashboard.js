import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WithLoading         from '../../common/WithLoading/WithLoading';
import CommentListRenderer from '../../common/ListRenderer/CommentListRenderer/CommentListRenderer';

import './Dashboard.css';
import { getExploreAsync } from '../../../async/explore/explore';
import CommentBox from '../../common/CommentBox/CommentBox';

const CommentListRendererWithLoading = WithLoading(CommentListRenderer);

export const Dashboard = () => {
  const uid                                   = useSelector((state) => state.user.uid);
  const username                              = useSelector((state) => state.user.username);
  const [limit, setLimit]                     = useState(10);
  const [comments, setComments]               = useState([]);
  const [initialLoad, setInitialLoad ]        = useState(true);
  const [loading,  setLoading]                = useState(false);
  const [requestComments, setRequestComments] = useState(true);

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
  }, [uid, limit, requestComments, comments]);


  const updateComment = (idx, update) => {
    comments[idx] = {...comments[idx], ...update};
    setComments([...comments]);
  };

  return (
    <div className="dashboard">
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
