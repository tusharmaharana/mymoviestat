import React, { createContext, useContext, useEffect, useState } from 'react';
import getMovie from '../hooks/getMovie';
import tmdb from '../api/tmdb';

const SelectContext = createContext();

export const useSelectedMovie = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectedMovie must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = props => {
  const [results, setResults] = useState(undefined);
  const [details, setDetails] = useState(undefined);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieModal, setShowMovieModal] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await tmdb('/movie/popular');
      setResults({ header: 'Popular Now', data });
    })();
  }, []);

  useEffect(() => {
    const func = async () => {
      try {
        const res = await getMovie(selectedMovie);
        setDetails(res);
        setShowMovieModal(true);
      } catch (err) {
        console.error(err);
      }
    };
    if (!!selectedMovie) func();
    else {
      setShowMovieModal(false);
      setDetails(null);
    }
  }, [selectedMovie]);

  return (
    <SelectContext.Provider
      value={{
        details,
        setDetails,
        selectedMovie,
        setSelectedMovie,
        showMovieModal,
        setShowMovieModal,
        results,
        setResults
      }}
      {...props}
    />
  );
};
