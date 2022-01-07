import React from 'react';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';

import { updateUserData } from 'slices/user-data.slice';
import { unixLocalTimeStartDate } from 'utils/datetime';
import { signInWithGoogle } from 'services/firebase';

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const handleSignWithGoogle = async () => {
    const { userId, userData, receivedStreaks }: any = await signInWithGoogle();

    if (userId) {
      localStorage.setItem('userId', userId);
    }

    const startOfYesterdayUnix = unixLocalTimeStartDate() - 86400;
    if (!receivedStreaks?.[startOfYesterdayUnix]) {
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
        <Button className="text-white text-sm capitalize" onClick={() => handleSignWithGoogle()}>
          <AccountCircleIcon />
          <span>Sign in</span>
        </Button>
      </>
  );
};

export default Auth;