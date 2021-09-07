import styled from '@emotion/styled';
import { produce } from 'immer';
import React, { useEffect, useState } from 'react';
import { ButtonGroup, Col, DropdownButton, Image, Modal, Row } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useAuth } from '../context/AuthContext';
import { useMovieRecord } from '../context/MovieContext';
import { useSelectedMovie } from '../context/SelectContext';
import getData from '../hooks/getData';
import Button from './widgets/Button';

const MovieDetails = props => {
  const { details, setSelectedMovie, setShowMovieModal, showMovieModal } = useSelectedMovie();
  console.log(details);
  const {
    state: { userData },
    actions: { setAuthModalState }
  } = useAuth();
  const {
    state: { totalStatuses, totalFavorites },
    actions: { setTotalStatuses, setTotalFavorites }
  } = useMovieRecord();

  const [movieStatus, setMovieStatus] = useState(undefined);
  const [favorite, setFavorite] = useState(undefined);

  useEffect(() => {
    console.log('object');
    console.log(totalStatuses);
    const statRes = totalStatuses?.find(current => details?.id === current?.movieId);
    statRes ? setMovieStatus(statRes?.status) : setMovieStatus(null);
  }, [details, totalStatuses]);

  useEffect(() => {
    const favRes = totalFavorites?.find(current => details?.id === current?.movieId);
    favRes ? setFavorite(true) : setFavorite(false);
  }, [details, totalFavorites]);

  const signInPrompt = () => {
    setSelectedMovie(null);
    setAuthModalState('signIn');
  };

  const hideModal = () => {
    setShowMovieModal(false);
    setSelectedMovie(null);
  };

  const handleStatusOnClick = async status => {
    if (!!userData) {
      const values = {
        status,
        movieId: details?.id,
        movie_details: [details]
      };
      try {
        await getData('status/movies', { body: values });

        const updatedStatus = produce(totalStatuses, draft => {
          const index = draft.findIndex(current => details?.id === current?.movieId);
          if (index >= 0) {
            if (draft.length > 0) draft[index].status = status;
          } else draft.push(values);
        });
        setTotalStatuses(updatedStatus);
        setMovieStatus(status);
      } catch (err) {
        console.error(err);
      }
    } else {
      signInPrompt();
    }
  };

  const handleFavoriteOnClick = async () => {
    if (!!userData) {
      try {
        await getData(`favorite/movies/${details?.id}`, { method: 'PUT' });

        const updatedFavorite = produce(totalFavorites, draft => {
          if (!favorite) draft.push({ movieId: details?.id, movie_details: [details] });
          else {
            const index = draft.findIndex(current => details?.id === current?.movieId);
            if (index >= 0) draft.splice(index, 1);
          }
        });
        setTotalFavorites(updatedFavorite);
        setFavorite(!favorite);
      } catch (err) {
        console.error(err);
      }
    } else {
      signInPrompt();
    }
  };

  return (
    <StyledModal centered show={showMovieModal} onHide={hideModal}>
      {!details ? (
        <div>Loading Movie</div>
      ) : (
        <Container>
          <Row className="d-flex">
            <Col className="" xs={4}>
              <Image src={details?.poster} fluid />
              <div>
                <DropdownButton
                  as={ButtonGroup}
                  id="dropdown-button-drop-right"
                  drop="right"
                  variant="secondary"
                  title={movieStatus ? movieStatus : 'Add to MyList'}
                >
                  {['Want To See', 'Watching', 'Seen', 'On Hold'].map(status => {
                    if (status !== movieStatus)
                      return (
                        <DropdownItem key={status} onClick={() => handleStatusOnClick(status)}>
                          {status}
                        </DropdownItem>
                      );
                    return null;
                  })}
                </DropdownButton>
                <Button
                  title={favorite ? 'Added to Favorites' : 'Add to Favorites'}
                  variant="secondary"
                  onClick={handleFavoriteOnClick}
                />
              </div>
            </Col>
            <Col xs={8} className="">
              <Row className="ml-0">
                <h1>{details?.title}</h1>
              </Row>
              <Row className="ml-0">
                <label>
                  IMDb-<strong>{details?.imdbRating}</strong>/10 &#x2219; {details?.runtime} &#x2219; {details?.year}{' '}
                  &#x2219; {details?.type}
                </label>
              </Row>
              <hr />
              <Row></Row>
              {/* <p>{details?.plot}</p> */}
            </Col>
          </Row>
        </Container>
      )}
    </StyledModal>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1rem;
`;

const StyledModal = styled(Modal)`
  .modal-dialog {
    max-width: 50rem;
  }
  .modal-dialog-centered {
    align-items: stretch;
  }
`;

export default MovieDetails;
