/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';
import { ButtonGroup, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import Button, { StyledButton } from './widgets/Button';

const Navbar = props => {
  const {
    state: { userData },
    actions: { signOut, setAuthModalState }
  } = useAuth();

  console.log(userData);

  return (
    <Nav className="d-flex justify-content-between">
      <div className="p-0 d-flex align-items-center">
        <img src="/assets/logo.png" width="30px" alt="MovieStat Logo" />
        <h4 style={{ color: 'white', fontWeight: 700, margin: 0, marginLeft: '10px' }}>MovieStat</h4>
      </div>
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
            <StyledButton className="mr-2" title="Sign In" name="signin" onClick={() => setAuthModalState('signIn')} />
            <StyledButton title="Sign Up" name="signup" onClick={() => setAuthModalState('signUp')} />
          </>
        )}
      </div>
    </Nav>
  );
};

const Nav = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 15px;
  background-color: black;
`;

export default Navbar;
