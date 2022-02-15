import React from 'react';
import { useSelectedMovie } from '../context/SelectContext';
import SearchResults from './SearchResults';

const Landing = props => {
  const { results } = useSelectedMovie();

  return !!results && <SearchResults />;
};

export default Landing;
