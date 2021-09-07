import styled from '@emotion/styled';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import Button from '../widgets/Button';
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
        <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
        <div className="">
          <OAuthButton href="/api/auth/google">
            <FontAwesomeIcon icon={faGoogle} />
            {`Sign ${isSignUp ? 'up' : 'in'} with Google`}
          </OAuthButton>
          <OAuthButton href="/api/auth/facebook">
            <FontAwesomeIcon icon={faFacebookF} />
            {`Sign ${isSignUp ? 'up' : 'in'} with Facebook`}
          </OAuthButton>
        </div>

        <AuthForm onSubmit={signIn} className={isSignUp ? 'd-none' : 'd-block'} />
        <AuthForm isSignUp onSubmit={signUp} className={isSignUp ? 'd-block' : 'd-none'} />
        <p>
          {isSignUp ? 'Already have an account. ' : "Don't have an account yet? "}
          <Button title={isSignUp ? 'Sign In' : 'Sign Up'} onClick={() => setIsSignUp(!isSignUp)} />
        </p>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const OAuthButton = styled.a`
  width: 100%;
  text-decoration: none;
  display: block;
`;

export default AuthModal;
