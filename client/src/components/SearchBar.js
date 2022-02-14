/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import omdb from '../api/omdb';
import { useSelectedMovie } from '../context/SelectContext';

const SearchBar = ({ setMyProfile }) => {
  const [query, setQuery] = useState('');
  const { setResults } = useSelectedMovie();
  const handleSubmit = async e => {
    e.preventDefault();
    const params = {
      s: query
    };
    try {
      const { data } = await omdb(params);
      setResults(data);
      setMyProfile(null);
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
        <FontAwesomeIcon css={iconStyle} icon={faSearch} />
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
