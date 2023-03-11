import axios from 'axios';
import { TComment, TStory } from '../types/types';
import { LIMIT_OF_STORIES } from '../constants/constants';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const getLatestStories = async (): Promise<TStory[]> => {
  const response = await axios.get(
    `${BASE_URL}/newstories.json`,
  );
  const ids = response.data.slice(0, LIMIT_OF_STORIES);
  const promises = ids.map((id: number) =>
    axios.get(`${BASE_URL}/item/${id}.json`));
  const responses = await Promise.all(promises);
  const stories = responses.map(({ data }) => data);
  return stories;
};

export const getStoryById = async (id: string | undefined): Promise<TStory> => {
  const response = await axios.get(
    `${BASE_URL}/item/${id}.json`,
  );
  return response.data;
};

export const getCommentById = async (commentId: number): Promise<TComment> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/item/${commentId}.json`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getComments = async (storyKids: number[]): Promise<TComment[]> => {
  try {
    const comments = await Promise.all(storyKids.map((id) => getCommentById(id)));
    return comments;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
