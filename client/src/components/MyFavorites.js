import { produce } from 'immer';
import { Card, Col, Row } from 'react-bootstrap';
import { useMovieRecord } from '../context/MovieContext';
import { useSelectedMovie } from '../context/SelectContext';
import getData from '../hooks/getData';
import Button from './widgets/Button';

const MyFavorites = () => {
  const {
    state: { totalFavorites },
    actions: { setTotalFavorites }
  } = useMovieRecord();
  const { setSelectedMovie } = useSelectedMovie();

  const handleOnClick = async movieId => {
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

  return (
    <div>
      {totalFavorites.length === 0 ? (
        <h4>No Movies in Favorites yet</h4>
      ) : (
        <>
          <h2>My Favorites</h2>
          <Row xs={1} md={5} className="watch-list">
            {totalFavorites.map((item, index) => (
              <Col key={`${item.movie_details[0].imdbID}-${index}`}>
                <Button variant="outline-danger" title="remove" onClick={() => handleOnClick(item?.movieId)} />
                <Card onClick={() => setSelectedMovie(item.movie_details[0])} style={{ cursor: 'pointer' }}>
                  <Card.Img variant="top" src={item.movie_details[0].poster} />
                  <Card.Body>
                    <Card.Title>{item.movie_details[0].title}</Card.Title>
                    <Card.Text>{item.movie_details[0].year}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default MyFavorites;
