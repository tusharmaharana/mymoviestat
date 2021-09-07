import { Card, Col } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import { useSelectedMovie } from '../context/SelectContext';

const SearchResults = () => {
  const { results, setSelectedMovie } = useSelectedMovie();

  return (
    <div>
      {!!results.Error ? (
        <h2>No results for </h2>
      ) : (
        <>
          <h2>Showing results for</h2>
          <Masonry breakpointCols={1}>
            {results.Search?.map((item, index) => {
              return (
                <Col key={`${item.imdbID}-${index}`}>
                  <Card onClick={() => setSelectedMovie(item)} style={{ cursor: 'pointer' }}>
                    <Card.Img variant="top" src={item.Poster} />
                    <Card.Body>
                      <Card.Title>{item.Title}</Card.Title>
                      <Card.Text>{item.Year}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Masonry>
          {/* <Row md={5} className="">
          </Row> */}
        </>
      )}
    </div>
  );
};

export default SearchResults;
