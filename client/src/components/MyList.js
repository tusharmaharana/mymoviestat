import styled from '@emotion/styled';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { produce } from 'immer';
import { Card, Col, Row } from 'react-bootstrap';
import { useMovieRecord } from '../context/MovieContext';
import { useSelectedMovie } from '../context/SelectContext';
import getData from '../hooks/getData';

const MyList = () => {
  const {
    state: { totalStatuses },
    actions: { setTotalStatuses }
  } = useMovieRecord();
  const { setSelectedMovie } = useSelectedMovie();

  const watchList = totalStatuses.filter(current => current?.status === 'Want To See');
  const watching = totalStatuses.filter(current => current?.status === 'Watching');
  const seen = totalStatuses.filter(current => current?.status === 'Seen');
  const onHold = totalStatuses.filter(current => current?.status === 'On Hold');

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
      {totalStatuses.length === 0 ? (
        <h4>No Movies Added in MyList yet</h4>
      ) : (
        <>
          {watchList.length > 0 && (
            <>
              <h4>Watch List</h4>
              <Row xs={1} md={5} className="watch-list">
                {watchList.map((item, index) => showMovieList(item, index))}
              </Row>
            </>
          )}
          {watching.length > 0 && (
            <>
              <h4>Watching</h4>
              <Row xs={1} md={5} className="watching-list">
                {watching.map((item, index) => showMovieList(item, index))}
              </Row>
            </>
          )}
          {seen.length > 0 && (
            <>
              <h4>Seen</h4>
              <Row xs={1} md={5} className="seen-list">
                {seen.map((item, index) => showMovieList(item, index))}
              </Row>
            </>
          )}
          {onHold.length > 0 && (
            <>
              <h4>On Hold</h4>
              <Row xs={1} md={5} className="onHold-list">
                {onHold.map((item, index) => showMovieList(item, index))}
              </Row>
            </>
          )}
        </>
      )}
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
