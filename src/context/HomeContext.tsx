import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { getLatestStories } from '../api/api';
import { TStory } from '../types/types';

type NewsContextType = {
  stories: TStory[];
  fetchStories: () => Promise<void>;
  isLoading: boolean;
};

type TProps={
  children: ReactNode | ReactNode[]
}

export const HomeContext = createContext<NewsContextType>({
  stories: [],
  fetchStories: async () => {},
  isLoading: true,
});

export const NewsProvider: React.FC<TProps> = ({ children }) => {
  const [stories, setStories] = useState<TStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStories = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getLatestStories();
      setStories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories();

    const intervalId = setInterval(() => {
      fetchStories();
    }, 60000); // update every minute

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchStories]);

  const contextValue = useMemo(() => (
    { stories, isLoading, fetchStories }
  ), [stories, isLoading, fetchStories]);

  return (
    <HomeContext.Provider value={contextValue}>
      {children}
    </HomeContext.Provider>
  );
};
