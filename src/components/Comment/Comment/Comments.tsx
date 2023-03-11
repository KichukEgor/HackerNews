import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Skeleton, Typography, Button, Box } from '@mui/material';
import './Comments.css';
import { getCommentById, getComments } from '../../../api/api';
import { TComment } from '../../../types/types';

type TProps = {
  id: number;
}

const Comments: React.FC<TProps> = ({ id }) => {
  const [comment, setComment] = useState<TComment | null>(null);
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState<TComment[]>([]);
  const [hideReplies, setHideReplies] = useState(true);

  const fetchComment = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCommentById(id);
      setComment(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const fetchReplies = useCallback(async () => {
    if (!comment || !comment.kids) {
      return;
    }

    try {
      const data = await getComments(comment.kids);
      setReplies(data);
    } catch (error) {
      console.log(error);
    }
  }, [comment]);

  useEffect(() => {
    fetchReplies();
  }, [fetchReplies]);

  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  const toggleReplies = () => {
    setHideReplies(!hideReplies);
  };

  // eslint-disable-next-line no-shadow
  const renderComment = (comment: TComment) => {
    const hasReplies = comment.kids && comment.kids.length > 0;
    return (
      <Paper className="comment">
        <Typography variant="h6" className="comment__author">
          Author:
          {' '}
          {comment.by}
        </Typography>
        <Typography variant="subtitle2" className="comment__date">
          Date:
          {' '}
          {new Date(comment.time * 1000).toLocaleDateString()}
        </Typography>
        <Typography
          variant="body1"
          className="comment__content"
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
        {hasReplies && (
          <div className="comment__replies">
            <Button onClick={toggleReplies} variant="outlined">
              {hideReplies ? 'Show replies' : 'Hide replies'}
            </Button>
            {!hideReplies && (
              <div className="comment__replies-list">
                {replies.map((reply) => (
                  <Comments key={reply.id} id={reply.id} />
                ))}
              </div>
            )}
          </div>
        )}
      </Paper>
    );
  };

  if (loading) {
    return (
      <Box sx={{ pt: 0.5 }}>
        <Skeleton width="200px" />
        <Skeleton width="200px" />
        <Skeleton variant="rectangular" width="60%" height={118} />
      </Box>
    );
  }

  if (!comment) {
    return null;
  }

  return renderComment(comment);
};

export default Comments;
