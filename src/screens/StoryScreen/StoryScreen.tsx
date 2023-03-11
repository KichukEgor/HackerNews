import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, createTheme, Link, Skeleton, Typography } from '@mui/material';
import BackLink from '../../components/BackLink/BackLink';
import Comments from '../../components/Comment/Comments';
import { getStoryById } from '../../api/api';
import { TStory } from '../../types/types';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    text: {
      primary: '#fff',
      secondary: '#ccc',
    },
  },
});

function StoryScreen() {
  const { id } = useParams();
  const [newsItem, seTStory] = useState<TStory>();
  const [loading, setIsLoading] = useState(false);
  const [isCommentsReloading, setIsCommentsReloading] = useState(false);

  useEffect(() => {
    async function fetchStory() {
      const data = await getStoryById(id);
      seTStory(data);
      setIsLoading(false);
    }
    fetchStory();
  }, [id]);

  const reloadComments = async () => {
    setIsCommentsReloading(true);
    const data = await getStoryById(id);
    seTStory(data);
    setIsCommentsReloading(false);
  };

  if (loading) {
    return (
      <Box sx={{ pt: 0.5 }}>
        <Skeleton width="500px" height={80} />
        <Skeleton width="200px" />
        <Skeleton width="200px" />
        <Skeleton width="200px" />
        <Skeleton width="220px" height={50} />
        <Skeleton variant="rectangular" width="60%" height={160} sx={{ marginBottom: '16px' }} />
        <Skeleton variant="rectangular" width="60%" height={160} />
      </Box>
    );
  }

  if (!newsItem) {
    return null;
  }

  return (
    <Box className="story">
      <BackLink />
      <Typography variant="h4" sx={{ color: darkTheme.palette.text.primary, margin: '16px 0' }}>{newsItem?.title}</Typography>
      <Typography variant="subtitle1" sx={{ color: darkTheme.palette.text.secondary }}>
        Author:
        {newsItem?.by}
      </Typography>
      <Typography sx={{ color: darkTheme.palette.text.secondary }}>
        Date:
        {new Date((newsItem?.time ?? 0) * 1000).toLocaleDateString()}
      </Typography>

      <Typography variant="subtitle1" sx={{ color: darkTheme.palette.text.primary, marginBottom: '16px' }}>
        Read More on
        {' '}
        <Link href={newsItem?.url} target="_blank" rel="noopener noreferrer" underline="none" sx={{ fontSize: '18px', fontWeight: '700' }}>
          Website
        </Link>
      </Typography>
      <Box sx={{ marginBottom: '16px' }}>
        <Button variant="contained" color="primary" onClick={reloadComments} disabled={isCommentsReloading}>
          Refresh Comments
        </Button>
      </Box>

      <Typography variant="h6" color="white" sx={{ marginTop: '30px' }}>
        {!newsItem?.kids ? (
          'No comments yet'
        ) : (
          `Root comments (${newsItem?.kids.length}):`
        )}
      </Typography>

      {isCommentsReloading ? (
        <Box sx={{ pt: 0.5 }}>
          <Skeleton width="200px" />
          <Skeleton width="200px" />
          <Skeleton variant="rectangular" width="60%" height={118} />
        </Box>
      ) : (
        newsItem?.kids?.map((kidId) => (
          <div key={kidId} style={{ marginBottom: '16px' }}>
            <Comments id={kidId} />
          </div>
        ))
      )}
    </Box>
  );
}

export default StoryScreen;
