import { Button } from '@mui/material';
import { signInWithGoogle } from '../services/firebase';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../slices/user-data.slice';
import { unixLocalTimeStartDate } from '../utils/datetime';

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const handleSignWithGoogle = async () => {
    const { userId, userData } = await signInWithGoogle();

    if (userId) {
      localStorage.setItem('userId', userId);
    }

    const startOfYesterdayUnix = unixLocalTimeStartDate() - 86400;
    if (!userData?.receivedStreak?.[startOfYesterdayUnix]) {
      dispatch(updateUserData({
        ...userData,
        streak: 0
      }));
    } else {
      dispatch(updateUserData(userData));
    }
  };
  return (
      <>
        <Button className="text-white" onClick={() => handleSignWithGoogle()}>
          <i className="fab fa-google"/><span>Sign in</span>
        </Button>
      </>
  );
};

export default Auth;