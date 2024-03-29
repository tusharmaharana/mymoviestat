import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import tmdb from '../api/tmdb';
import { useMovieRecord } from '../context/MovieContext';
import { useSelectedMovie } from '../context/SelectContext';
import getData from '../hooks/getData';
import { StyledIcon } from './MyList';
import SearchResults from './SearchResults';
import Loader from './widgets/Loader';

const MyFavorites = () => {
  const {
    state: { totalFavorites },
    actions: { setTotalFavorites }
  } = useMovieRecord();
  const { setSelectedMovie } = useSelectedMovie();
  const [movieList, setMovieList] = useState();
  const [loading, setLoading] = useState(false);

  const handleOnClick = async (event, movieId) => {
    event.stopPropagation();
    try {
      await getData(`favorite/movies/${movieId}`, { method: 'PUT' });

      const updatedFavorite = produce(totalFavorites, draft => {
        const index = draft.findIndex(current => movieId === current?.movieId);
        if (index >= 0) draft.splice(index, 1);
      });
      setTotalFavorites(updatedFavorite);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMovieDetails = async list => {
    setLoading(true);
    const promisesArr = list.map(movie => tmdb(`/movie/${movie.movieId}`));
    const res = await Promise.all(promisesArr);

    setLoading(false);
    return list.map((movie, index) => ({ ...movie, movie_details: res[index].data }));
  };

  useEffect(() => {
    (async () => {
      const listWithDetails = await fetchMovieDetails(totalFavorites);
      setMovieList([...listWithDetails]);
    })();
  }, [totalFavorites]);

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
      {totalFavorites.length === 0 ? (
        <>
          <p className="mt-3 mb-5" style={{ color: 'white', fontSize: '1.6rem' }}>
            No Movie added to Favorites yet! Check these out &gt;
          </p>
          <SearchResults />
        </>
      ) : (
        <>
          <h2 className="my-3" style={{ color: 'white' }}>
            My Favorites
          </h2>
          <div className="mt-4">
            {movieList?.length > 0 ? (
              loading ? (
                <Loader color="white" width={50} />
              ) : (
                <>
                  <div className="d-flex align-items-start flex-wrap">{movieList.map(showMovieList)}</div>
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
        </>
      )}
    </div>
  );
};

export default MyFavorites;
