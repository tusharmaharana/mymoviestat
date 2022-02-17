/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import tmdb from '../api/omdb';
import { useSelectedMovie } from '../context/SelectContext';
import Loader from './widgets/Loader';

const SearchBar = ({ setMyProfile }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { setResults } = useSelectedMovie();
  const handleSubmit = async e => {
    e.preventDefault();
    const params = {
      query
    };
    try {
      setLoading(true);
      const { data } = await tmdb('/search/movie', params);
      setResults(data);
      setMyProfile(null);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form className="border border-dark mr-2 d-flex align-items-center" css={formStyle} onSubmit={handleSubmit}>
      <Form.Control
        placeholder="Quick Search"
        css={inputStyle}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className="border-0 p-0 mr-3 mt-1" style={{ backgroundColor: 'inherit', color: 'white' }}>
        {loading ? <Loader color="white" width={20} /> : <FontAwesomeIcon css={iconStyle} icon={faSearch} />}
      </button>
    </Form>
  );
};

const formStyle = css`
  width: 500px;
  background: #181818;
  border-radius: 10px;
  border: none !important;
  padding-left: 20px;
`;

const iconStyle = css`
  font-size: 16px;
`;

const inputStyle = css`
  background: #181818;
  color: white;
  border: none;
  transition: none;
  padding-top: 0px;
  padding-bottom: 0px;
  &:focus {
    box-shadow: none;
    background: #181818;
    color: white;
  }
`;

export default SearchBar;
