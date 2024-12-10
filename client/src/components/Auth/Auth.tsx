'use client';

import React, { useEffect, useState } from 'react';

import { Button, Modal } from 'antd';

import { SignIn } from '@/components/Auth/SignIn/SignIn';
import { SignUp } from '@/components/Auth/SignUp/SignUp';

enum EModalBody {
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
}

const Auth: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState<EModalBody | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authTokenZip');
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const showModalSignUp = () => {
    setModalBody(EModalBody.SIGN_UP);
    setIsModalOpen(true);
  };

  const showModalSignIn = () => {
    setModalBody(EModalBody.SIGN_IN);
    setIsModalOpen(true);
  };

  const signIn = (token: string) => {
    localStorage.setItem('authTokenZip', token);
    setIsAuth(true);
  };
  const signOut = () => {
    localStorage.removeItem('authTokenZip');
    setIsAuth(false);
  };

  const closeModal = () => {
    setModalBody(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        {isAuth ? (
          <Button
            className="my-05"
            type="primary"
            size={'small'}
            onClick={signOut}
          >
            Sign Out
          </Button>
        ) : (
          <>
            <Button
              className="my-05"
              type="primary"
              size={'small'}
              onClick={showModalSignIn}
            >
              Sign In
            </Button>
            <Button
              className="my-05"
              type="primary"
              size={'small'}
              onClick={showModalSignUp}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
      <Modal open={isModalOpen} onCancel={closeModal} footer={null}>
        {modalBody === EModalBody.SIGN_IN ? (
          <SignIn onClose={closeModal} signIn={signIn} />
        ) : (
          <SignUp />
        )}
      </Modal>
    </>
  );
};

export default Auth;
