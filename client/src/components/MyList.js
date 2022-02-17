import styled from '@emotion/styled';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { produce } from 'immer';
import { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useMovieRecord } from '../context/MovieContext';
import { useSelectedMovie } from '../context/SelectContext';
import getData from '../hooks/getData';
import SearchResults from './SearchResults';
import Button from './widgets/Button';

const listStatuses = ['Want To See', 'Watching', 'Seen', 'On Hold'];

const MyList = () => {
  const {
    state: { totalStatuses },
    actions: { setTotalStatuses }
  } = useMovieRecord();
  const { setSelectedMovie } = useSelectedMovie();
  const [activeStatus, setActiveStatus] = useState('Want To See');

  const movieLists = {};

  listStatuses.forEach(status => {
    movieLists[status] = totalStatuses.filter(movie => movie.status === status);
  });

  const handleOnClick = async (event, movieId) => {
    event.stopPropagation();
    try {
      await getData(`status/movies/${movieId}`, { method: 'DELETE' });
      const updatedStatus = produce(totalStatuses, draft => {
        const index = draft.findIndex(current => current?.movieId === movieId);
        if (index >= 0) draft.splice(index, 1);
      });
      setTotalStatuses(updatedStatus);
    } catch (err) {
      console.log(err);
    }
  };

  const showMovieList = (item, index) => {
    return (
      <Col key={`${item.movie_details[0].imdbID}-${index}`}>
        <StyledCard onClick={() => setSelectedMovie(item.movie_details[0])}>
          <Card.Img
            variant="top"
            src={item.movie_details[0].poster}
            style={{ boxShadow: ' inset 0px 0px 20px black' }}
          />
          <StyledIcon
            className="remove-icon"
            icon={faTimesCircle}
            onClick={event => handleOnClick(event, item?.movieId)}
          />
          <Card.Body>
            <Card.Title>{item.movie_details[0].title}</Card.Title>
            <Card.Text>{item.movie_details[0].year}</Card.Text>
          </Card.Body>
        </StyledCard>
      </Col>
    );
  };

  return (
    <div>
      <div className="my-3">
        {listStatuses.map(status => (
          <Button
            title={status}
            variant={status === activeStatus ? 'primary' : 'light'}
            onClick={() => setActiveStatus(status)}
            className="mr-4"
            style={{ minWidth: '100px' }}
          />
        ))}
      </div>
      <div className="mt-5">
        {movieLists[activeStatus].length > 0 ? (
          <>
            <h4>{activeStatus} List</h4>
            <Row xs={1} md={5}>
              {movieLists[activeStatus].map((item, index) => showMovieList(item, index))}
            </Row>
          </>
        ) : (
          <>
            <p className="mb-5" style={{ color: 'white', fontSize: '1.6rem' }}>
              No Movie added yet! Check these out &gt;
            </p>
            <SearchResults />
          </>
        )}
      </div>
    </div>
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  font-size: 30px;
  cursor: pointer;
  color: red;
  right: 0.3rem;
  top: -2rem;
  visibility: hidden;
  opacity: 0;
  transition: top 200ms ease-in, opacity 350ms ease-out;
`;

const StyledCard = styled(Card)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    box-shadow: 4px 4px 8px #3d3d3d;
    transform: scale(1.05);
  }
  &:hover .remove-icon {
    top: 0.3rem;
    visibility: visible;
    opacity: 1;
  }
`;

export default MyList;
