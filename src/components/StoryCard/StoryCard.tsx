/* eslint-disable */
import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {Card, CardContent, Typography} from '@mui/material';
import {formatDistanceToNow} from 'date-fns';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import './StoryCard.css';

type TProps = {
    id: number;
    title: string;
    score: number;
    by: string;
    time: number;
}

const StoryCard: FC<TProps> = ({id, title, score, by, time}) => {
    const [likes, setLike] = useState(score);
    //eslint-disable-next-line
    const handleAddLikes =(e: any)=> {
        e.preventDefault();
        setLike(like => like + 1)
    };

    return (
        <Card className="story-card">
            <Link className="story-link" to={`/story/${id}`}>
                <div className="story-card__header">
                    <Typography variant="h5" component="h2">
                        {title || 'No title'}
                    </Typography>
                </div>
                <CardContent>
                    <Typography variant="subtitle1" sx={{color: 'text.secondary'}}>
                        Created by:
                        {' '}
                        {by}
                    </Typography>
                    <Typography variant="subtitle1" sx={{color: 'text.secondary'}}>
                        {formatDistanceToNow(new Date(time * 1000))}
                        {' '}
                        ago
                    </Typography>
                </CardContent>
                <CardContent sx={{flexShrink: 0}}>
                    <Typography onClick={ (e)=>handleAddLikes(e) } variant="subtitle1" sx={{display: 'flex', gap: '8px'}}>
                        {likes}
                        {' '}
                        <ThumbUpAltIcon color="info"/>
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    )
}

export default StoryCard;
