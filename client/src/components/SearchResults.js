import { Card } from 'react-bootstrap';
import { useSelectedMovie } from '../context/SelectContext';

const SearchResults = () => {
  const { results, setSelectedMovie } = useSelectedMovie();

  return (
    <div>
      {!!results.Error ? (
        <h2>Sorry, no results found </h2>
      ) : (
        <>
          <h2 style={{ color: 'white' }}>Results</h2>
          <div className="d-flex align-items-center flex-wrap">
            {results.Search?.map((item, index) => {
              return (
                <Card
                  className="m-3"
                  key={`${item.imdbID}-${index}`}
                  onClick={() => setSelectedMovie(item)}
                  style={{ cursor: 'pointer', width: '250px', height: '470px' }}
                >
                  <Card.Img
                    variant="top"
                    src={item.Poster === 'N/A' ? '/assets/no-image.png' : item.Poster}
                    style={{ height: '350px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{item.Title}</Card.Title>
                    <Card.Text>{item.Year}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
          {/* <Row md={5} className="">
          </Row> */}
        </>
      )}
    </div>
  );
};

export default SearchResults;
