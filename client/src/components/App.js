import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import AuthModal from './auth/AuthModal';
import Landing from './Landing';
import MovieDetails from './MovieDetails';
import MyFavorites from './MyFavorites';
import MyList from './MyList';
import Navbar from './Navbar';

const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [myProfile, setMyProfile] = useState(null);

  const {
    state: { userData, authModalState },
    actions: { setAuthModalState }
  } = useAuth();

  // const { details } = useSelectedMovie();

  const showComponent = () => {
    switch (myProfile) {
      case 'My List':
        return <MyList />;
      case 'My Favorites':
        return <MyFavorites />;
      default:
        return <Landing />;
    }
  };

  if (userData === undefined) return <div>Loading...</div>;

  return (
    <Container>
      <Row>
        <Navbar setSearchQuery={setSearchQuery} setMyProfile={setMyProfile} />
      </Row>
      <Row>{showComponent()}</Row>
      {<MovieDetails />}
      <AuthModal
        show={!!authModalState}
        onHide={() => setAuthModalState(null)}
        signup={authModalState === 'signUp' ? true : false}
      />
    </Container>
  );
};

export default App;
