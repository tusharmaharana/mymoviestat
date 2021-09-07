/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';
import { ButtonGroup, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import Button from './widgets/Button';

const Navbar = props => {
  const {
    state: { userData },
    actions: { signOut, setAuthModalState }
  } = useAuth();

  return (
    <Nav className="d-flex justify-content-between">
      <div className="col-4 p-0">
        <h2>MyMoviesStat</h2>
      </div>
      <div className="col-8 d-flex justify-content-end p-0">
        <SearchBar {...props} />
        <div className="d-flex justify-content-end">
          {userData ? (
            <>
              <Button
                variant="danger"
                title="Sign Out"
                onClick={async () => {
                  await signOut();
                }}
              />
              <DropdownButton as={ButtonGroup} id="dropdown-basic-button" title={null}>
                {['My List', 'My Favorites'].map(curr => (
                  <DropdownItem key={curr} onClick={() => props.setMyProfile(curr)}>
                    {curr}
                  </DropdownItem>
                ))}
              </DropdownButton>
            </>
          ) : (
            <>
              <Button className="mr-2" title="Sign In" name="signin" onClick={() => setAuthModalState('signIn')} />
              <Button title="Sign Up" name="signup" onClick={() => setAuthModalState('signUp')} />
            </>
          )}
        </div>
      </div>
    </Nav>
  );
};

const Nav = styled.div`
  width: 100%;
  padding: 5px 0px 5px 0px;
  border-bottom: 2px solid #1b2021;
`;

// const AuthDiv=styled.div`
// `;

export default Navbar;
