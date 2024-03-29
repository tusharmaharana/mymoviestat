/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';
import { ButtonGroup, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useAuth } from '../context/AuthContext';
import { useSelectedMovie } from '../context/SelectContext';
import SearchBar from './SearchBar';
import { StyledButton } from './widgets/Button';

const Navbar = props => {
  const {
    state: { userData },
    actions: { signOut, setAuthModalState }
  } = useAuth();

  const { setResults } = useSelectedMovie();

  const navOptions = [
    {
      title: 'My List',
      onClick: () => props.setMyProfile('My List')
    },
    {
      title: 'My Favorites',
      onClick: () => props.setMyProfile('My Favorites')
    },
    {
      title: <p style={{ color: 'red', margin: 0 }}>Sign Out</p>,
      onClick: async () => {
        await signOut();
      }
    }
  ];

  const profileName = `Hi, ${userData?.name.split(' ')[0]}`;

  return (
    <Nav className="d-flex justify-content-between">
      <div
        className="p-0 d-flex align-items-center"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setResults('');
          props.setMyProfile('Landing');
        }}
      >
        <img src="/assets/logo.png" width="30px" alt="MovieStat Logo" />
        <h4 style={{ color: 'white', fontWeight: 700, margin: 0, marginLeft: '10px' }}>MovieStat</h4>
      </div>
      <SearchBar {...props} />
      <div className="d-flex justify-content-end">
        {userData ? (
          <div className="d-flex align-items-center">
            <DropdownButton as={ButtonGroup} id="dropdown-basic-button" title={profileName}>
              {navOptions.map(curr => (
                <DropdownItem key={curr.title} onClick={curr.onClick}>
                  {curr.title}
                </DropdownItem>
              ))}
            </DropdownButton>
          </div>
        ) : (
          <>
            <StyledButton
              variant="outline-primary"
              style={{ background: 'none', color: '#862eff' }}
              className="mr-2"
              title="Sign In"
              name="signin"
              onClick={() => setAuthModalState('signIn')}
            />
          </>
        )}
      </div>
    </Nav>
  );
};

const Nav = styled.div`
  width: 100%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 15px;
  background-color: black;

  .dropdown button {
    background: none;
    border: none;
    box-shadow: none;

    :focus {
      outline: none !important;
      outline-offset: none !important;
      box-shadow: none !important;
      background: none !important;
    }
  }
`;

export default Navbar;
