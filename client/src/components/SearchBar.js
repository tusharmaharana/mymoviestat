/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import omdb from '../api/omdb';
import { useSelectedMovie } from '../context/SelectContext';

const SearchBar = ({ setSearchQuery, setMyProfile }) => {
  const [query, setQuery] = useState('');
  const { setResults } = useSelectedMovie();
  const handleSubmit = async e => {
    e.preventDefault();
    setSearchQuery(query);
    const params = {
      s: query
    };
    const { data } = await omdb(params);
    setResults(data);
    setMyProfile(null);
  };

  return (
    <Form
      className="border border-dark mr-2 d-flex align-items-center"
      style={{ width: '300px' }}
      onSubmit={handleSubmit}
    >
      <button className="border-0 p-0 ml-2 mt-2" style={{ backgroundColor: 'inherit' }}>
        <FontAwesomeIcon css={iconStyle} icon={faSearch} />
      </button>
      <Form.Control
        placeholder="Quick Search"
        css={inputStyle}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </Form>
  );
};

const iconStyle = css`
  font-size: 20px;
`;

const inputStyle = css`
  border-radius: 20px;
  border: none;
  transition: none;
  padding-top: 0px;
  padding-bottom: 0px;
  &:focus {
    box-shadow: none;
  }
`;

export default SearchBar;
