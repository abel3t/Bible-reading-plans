import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

import { updateUserData } from 'slices/user-data.slice';
import { unixLocalTimeStartDate } from 'utils/datetime';
import { signInWithGoogle } from 'services/firebase';

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
            <Button className="text-white text-sm capitalize sm:ml-1 md:ml-2" onClick={() => handleSignWithGoogle()}>
              <AccountCircleIcon/>
              <span>Sign in</span>
            </Button>
        }
      </div>
  );
};

export default Auth;