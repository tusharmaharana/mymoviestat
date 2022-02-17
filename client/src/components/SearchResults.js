import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useSelectedMovie } from '../context/SelectContext';

const SearchResults = () => {
  const { results, setSelectedMovie, setResults } = useSelectedMovie();

  useEffect(() => {
    return () => {
      setResults(null);
    };
  }, []);

  const movieResults = results || JSON.parse(sessionStorage.getItem('popular'));

  return (
    <div>
      {!movieResults.data.total_results ? (
        <h2 className="mt-3" style={{ color: 'white' }}>
          Sorry, no results found{' '}
        </h2>
      ) : (
        <>
          <h2 className="my-3" style={{ color: 'white' }}>
            {movieResults.header}
          </h2>
          <div className="d-flex align-items-start flex-wrap">
            {movieResults.data.results?.map((item, index) => {
              return (
                <div
                  className="position-relative m-3"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedMovie(item)}
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
                    ★ {item.vote_average}
                  </div>
                  <Card
                    key={`${item.id}-${index}`}
                    style={{ width: '250px', minHeight: '450px', background: 'none', border: '3px solid white' }}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        !item.poster_path
                          ? '/assets/no-image.png'
                          : `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`
                      }
                      style={{ height: '350px', objectFit: 'cover', background: 'white' }}
                    />
                    <Card.Body>
                      <Card.Title style={{ color: 'white' }}>{item.title}</Card.Title>
                      <Card.Text style={{ color: 'white' }}>
                        {item.release_date ? new Date(item.release_date).getFullYear() : '---'}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <div
                    className="position-absolute"
                    style={{ height: '100%', width: '100%', background: 'rgba(0,0,0,0.3)', top: 0, left: 0 }}
                  ></div>
                </div>
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
