import styled from '@emotion/styled';
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
  const [myProfile, setMyProfile] = useState(null);

  const {
    state: { userData, authModalState },
    actions: { setAuthModalState }
  } = useAuth();

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
    <StyledContainer fluid>
      <div style={{ width: '90%', margin: '0 auto' }}>
        <Row>
          <Navbar setMyProfile={setMyProfile} />
        </Row>
        <Row>{showComponent()}</Row>
        <MovieDetails />
        <AuthModal
          show={!!authModalState}
          onHide={() => setAuthModalState(null)}
          signup={authModalState === 'signUp' ? true : false}
        />
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
 min-height: 100vh;
  background: #141E30;
  background: -webkit-linear-gradient(to right, #243B55, #141E30);
  background: 'linear-gradient(to right, #243B55, #141E30)
`;

export default App;
