import React, { useContext } from 'react';
import { Grid, Skeleton } from '@mui/material';
import StoryCard from '../../components/StoryCard/StoryCard';
import { HomeContext } from '../../context/HomeContext';
import './HomeScreen.css';

const HomeScreen: React.FC = () => {
  const { stories, isLoading } = useContext(HomeContext);

  return (
    <div className="grid-container">
      {isLoading && !stories.length
        ? [...Array(12)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Skeleton variant="rectangular" height={200} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Grid>
        ))
        : stories.map((story) => (
          <StoryCard
            key={story.id}
            id={story.id}
            title={story.title}
            time={story.time}
            by={story.by}
            score={story.score}
            />
        ))}
    </div>
  );
};

export default HomeScreen;
