/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { StyledButton } from '../widgets/Button';
import AuthForm from './AuthForm';

const AuthModal = props => {
  const { signup, ...restProps } = props;
  const [isSignUp, setIsSignUp] = useState(undefined);

  useEffect(() => {
    if (props.show) setIsSignUp(signup);
  }, [signup, props.show]);

  const {
    actions: { signIn, signUp }
  } = useAuth();

  return (
    <Modal centered {...restProps}>
      <Container>
        <h1 style={{ color: '#ffffff' }}>{isSignUp ? 'Create Account' : 'Sign In'}</h1>

        <AuthForm
          onSubmit={signIn}
          className={isSignUp ? 'd-none' : 'd-block d-flex flex-column align-items-center justify-content-center'}
        />
        <AuthForm
          isSignUp
          onSubmit={signUp}
          className={isSignUp ? 'd-block d-flex flex-column align-items-center justify-content-center' : 'd-none'}
        />

        <div className="d-flex flex-column align-items-center justify-content-center mt-4">
          <h4 style={{ color: '#ffffff' }}>or use</h4>
          <div className="d-flex align-items-center">
            <OAuthButton href="/api/auth/google">
              <div className="mr-4 d-flex flex-column align-items-center justify-content-center">
                <FontAwesomeIcon icon={faGoogle} css={iconStyle} style={{ color: '#E34133' }} />
                <p style={{ color: '#E34133', marginTop: '5px' }}>Google</p>
              </div>
            </OAuthButton>
            <OAuthButton href="/api/auth/facebook">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <FontAwesomeIcon icon={faFacebookF} css={iconStyle} />
                <p style={{ marginTop: '5px' }}>Facebook</p>
              </div>
            </OAuthButton>
          </div>
        </div>

        <div className="mt-4 d-flex align-items-center">
          <p className="m-0 mr-2" style={{ color: '#ffffff' }}>
            {isSignUp ? 'Already have an account? ' : "Don't have an account yet? "}
          </p>
          <StyledButton
            variant="outline-primary"
            style={{ background: 'none', color: '#862eff' }}
            size="sm"
            title={isSignUp ? 'Sign In' : 'Sign Up'}
            onClick={() => setIsSignUp(!isSignUp)}
          />
        </div>
      </Container>
    </Modal>
  );
};

const iconStyle = css`
  font-size: 30px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #000000;
`;

const OAuthButton = styled.a`
  width: 100%;
  text-decoration: none;
  display: block;
`;

export default AuthModal;
