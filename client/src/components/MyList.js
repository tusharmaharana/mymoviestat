import styled from '@emotion/styled';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import tmdb from '../api/tmdb';
import { useMovieRecord } from '../context/MovieContext';
import { useSelectedMovie } from '../context/SelectContext';
import getData from '../hooks/getData';
import SearchResults from './SearchResults';
import Button from './widgets/Button';
import Loader from './widgets/Loader';

const listStatuses = ['Want To See', 'Watching', 'Seen', 'On Hold'];

const MyList = () => {
  const {
    state: { totalStatuses },
    actions: { setTotalStatuses }
  } = useMovieRecord();
  const { setSelectedMovie } = useSelectedMovie();
  const [activeStatus, setActiveStatus] = useState('Want To See');
  const [loading, setLoading] = useState(false);
  const [movieLists, setMovieLists] = useState();

  useEffect(() => {
    (async () => {
      const newMovieList = listStatuses.reduce((acc, curr) => {
        acc[curr] = totalStatuses.filter(movie => movie.status === curr);
        return acc;
      }, {});

      const listWithDetails = await fetchMovieDetails(newMovieList);
      setMovieLists({ ...listWithDetails });
    })();

    const fetchMovieDetails = async list => {
      setLoading(true);
      const promisesArr = list[activeStatus].map(movie => tmdb(`/movie/${movie.movieId}`));
      const res = await Promise.all(promisesArr);

      setLoading(false);
      return {
        ...list,
        [activeStatus]: list[activeStatus].map((movie, index) => ({ ...movie, movie_details: res[index].data }))
      };
    };
  }, [activeStatus, totalStatuses]);

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
    const movie = item.movie_details;
    return movie ? (
      <div
        className="position-relative m-3"
        style={{ cursor: 'pointer' }}
        onClick={() => setSelectedMovie(movie)}
        key={`${movie.id}-${index}`}
      >
        <div
          className="position-absolute pl-2 d-flex align-items-center"
          style={{
            top: '20px',
            left: 0,
            width: '70px',
            height: '30px',
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            zIndex: 1,
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px'
          }}
        >
          ★ {movie.vote_average}
        </div>
        <StyledIcon className="mr-2" icon={faTrash} onClick={event => handleOnClick(event, movie?.id)} />
        <Card style={{ width: '15rem', background: 'none', border: '3px solid white' }}>
          <Card.Img
            variant="top"
            src={
              !movie.poster_path
                ? '/assets/no-image.png'
                : `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
            }
            style={{ height: '350px', objectFit: 'cover', background: 'white' }}
          />
          {/* <Card.Body>
            <Card.Title style={{ color: 'white' }}>{movie.title}</Card.Title>
            <Card.Text style={{ color: 'white' }}>
              {movie.release_date ? new Date(movie.release_date).getFullYear() : '---'}
            </Card.Text>
          </Card.Body> */}
        </Card>
        <div
          className="position-absolute"
          style={{ height: '100%', width: '100%', background: 'rgba(0,0,0,0.15)', top: 0, left: 0 }}
        ></div>
      </div>
    ) : null;
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
            key={status}
          />
        ))}
      </div>
      <div className="mt-5">
        {movieLists?.[activeStatus]?.length > 0 ? (
          loading ? (
            <Loader color="white" width={50} />
          ) : (
            <>
              <h4 className="mb-3" style={{ color: 'white' }}>
                {activeStatus} List
              </h4>
              <div className="d-flex align-items-start flex-wrap">{movieLists[activeStatus].map(showMovieList)}</div>
            </>
          )
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

export const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  cursor: pointer;
  color: white;
  right: 0px;
  top: 25px;
  z-index: 2;
`;

export default MyList;
