import { createContext, useContext, useEffect, useState } from 'react';
import getData from '../hooks/getData';
import { useAuth } from './AuthContext';

const MovieContext = createContext();

export const useMovieRecord = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = props => {
  const {
    state: { userData }
  } = useAuth();
  const [totalStatuses, setTotalStatuses] = useState(undefined);
  const [totalFavorites, setTotalFavorites] = useState(undefined);

  useEffect(() => {
    const func = async () => {
      const statRes = await getData('status/movies');
      statRes !== 404 ? setTotalStatuses(statRes) : setTotalStatuses([]);

      const favRes = await getData('favorite/movies');
      favRes !== 404 ? setTotalFavorites(favRes) : setTotalFavorites([]);
    };
    if (!!userData) func();
    else {
      setTotalStatuses([]);
      setTotalFavorites([]);
    }
  }, [userData]);

  return (
    <MovieContext.Provider
      value={{
        state: { totalStatuses, totalFavorites },
        actions: { setTotalStatuses, setTotalFavorites }
      }}
      {...props}
    />
  );
};
