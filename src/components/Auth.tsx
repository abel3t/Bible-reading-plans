import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

import { updateIsAuthenticated, updateUserData } from 'slices/user-data.slice';
import { unixLocalTimeStartDate } from 'utils/datetime';
import { setPathValue, signInWithGoogle } from 'services/firebase';

const Auth: React.FC = () => {
  const [user, setUser]: [any, Function] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userImageUrl = localStorage.getItem('userImageUrl');

    setUser({
      userId,
      userImageUrl
    });
  }, []);

  const dispatch = useDispatch();
  const handleSignWithGoogle = async () => {
    const { userId, userImageUrl, userData, receivedStreaks }: any = await signInWithGoogle();

    dispatch(updateIsAuthenticated(true));

    if (userId) {
      localStorage.setItem('userId', userId);
    }

    if (userImageUrl) {
      localStorage.setItem('userImageUrl', userImageUrl);
    }

    const startOfYesterdayUnix = unixLocalTimeStartDate() - 86400;
    if (!receivedStreaks?.[startOfYesterdayUnix]) {
      dispatch(updateUserData({
        ...userData,
        streak: 0
      }));
      setPathValue(`users/${userId}`, {
        ...userData,
        streak: 0
      }).then(() => true);
    } else {
      dispatch(updateUserData(userData));
    }

    setUser({ userId, userImageUrl });
  };
  return (
      <div className="ml-2 flex items-center">
        {
            user.userId && user.userImageUrl &&
            <Image src={user.userImageUrl} alt="avt" width="30" height="30"/>
        }
        {
            (!user.userId || !user.userImageUrl) &&
            <Button variant="contained" className="text-white text-sm capitalize font-normal"
                    style={{ backgroundColor: '#6C97B5' }} onClick={() => handleSignWithGoogle()}>
              <AccountCircleIcon/>
              <span>Login</span>
            </Button>
        }
      </div>
  );
};

export default Auth;