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
import Loader from './widgets/Loader';

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
    <StyledModal
      show={showMovieModal}
      onHide={() => {
        const modal = document.getElementsByClassName('modal-dialog')[0];
        modal.style.animation = 'animateexit 0.4s forwards';
        setTimeout(() => {
          hideModal();
        }, 400);
      }}
    >
      {!details ? (
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
          <Loader color="black" size="50px" />
        </div>
      ) : (
        <Container
          style={{
            backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${details?.backdrop_path})`
          }}
        >
          <div
            className="position-absolute w-100 h-100"
            style={{
              top: 0,
              left: 0,
              background: 'linear-gradient(to right, rgba(29,43,100, 0.8), rgba(248,205,218, 0.8))'
            }}
          ></div>
          <Row className="d-flex align-items-center h-100">
            <Col xs={3}>
              <Image
                width="350"
                style={{ borderRadius: '20px' }}
                src={
                  !details.poster_path
                    ? '/assets/no-image.png'
                    : `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${details.poster_path}`
                }
                fluid
              />
            </Col>
            <Col xs={9} className="">
              <Row className="ml-0">
                <h1>
                  <span style={{ fontWeight: 700 }}>{details?.title}</span>{' '}
                  {details?.release_date ? `(${new Date(details?.release_date).getFullYear()})` : ''}
                </h1>
              </Row>
              <Row className="ml-0 mb-3">
                <label style={{ fontSize: '1.2rem' }}>
                  <strong>{details?.vote_average}</strong>/10 • {details?.genres.map(genre => genre.name).join(', ')}{' '}
                  {details?.runtime > 0
                    ? `• ${Math.floor(details?.runtime / 60) > 0 ? `${Math.floor(details?.runtime / 60)}hr` : ''} ${
                        details?.runtime % 60
                      }min`
                    : ''}
                </label>
              </Row>
              <div className="mb-3" style={{ maxWidth: '60%' }}>
                <h3>Overview</h3>
                <p>{details?.overview}</p>
              </div>
              <div className="mb-3" style={{ maxWidth: '60%' }}>
                <h5>Director</h5>
                <p>{details?.crew.find(member => member.job === 'Director').name}</p>
                <h5>Cast</h5>
                <p>
                  {details?.cast
                    .slice(0, 5)
                    .map(member => member.name)
                    .join(', ')}
                </p>
              </div>
              <div>
                {details?.homepage ? (
                  <Button
                    title="Watch Now"
                    variant="light"
                    onClick={() => window.open(details?.homepage)}
                    className="mr-3"
                  />
                ) : null}
                <Button
                  title={favorite ? 'Added to Favorites' : 'Add to Favorites'}
                  variant="light"
                  onClick={handleFavoriteOnClick}
                  className="mr-3"
                />
                <DropdownButton
                  as={ButtonGroup}
                  id="dropdown-button-drop-right"
                  drop="right"
                  variant="light"
                  title={movieStatus ? movieStatus : 'Add to My List'}
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
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </StyledModal>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.2rem 4rem;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  color: white;
`;

const StyledModal = styled(Modal)`
  @keyframes animateenter {
    from {
      bottom: -300px;
      opacity: 0;
    }

    to {
      bottom: 0;
      opacity: 1;
    }
  }

  @keyframes animateexit {
    from {
      bottom: 0px;
      opacity: 1;
    }

    to {
      bottom: -300px;
      opacity: 0;
    }
  }
  .modal-dialog {
    width: 100%;
    height: 600px;
    margin: 0 !important;
    padding: 0 40px !important;
    position: fixed;
    animation: animateenter 0.4s forwards;
    max-width: none !important;
  }
  .modal-content {
    width: 100%;
    height: 100%;
    border-radius: 0;
    border-top-left-radius: 30px !important;
    border-top-right-radius: 30px !important;
    overflow: hidden;
  }
  .modal-dialog-centered {
    align-items: stretch;
  }
`;

export default MovieDetails;
