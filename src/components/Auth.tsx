import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, Popover } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import { getIsAuthenticated, resetUserData, updateIsAuthenticated, updateUserData } from 'slices/user-data.slice';
import { unixLocalTimeStartDate } from 'utils/datetime';
import { setPathValue, signInWithGoogle, signOutGoogle } from 'services/firebase';
import { resetSettings } from '../slices/settings.slice';


const Auth: React.FC = () => {
  const [user, setUser]: [any, Function] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
    setAnchorEl(null);
  };
  const handleModalClose = () => setModalOpen(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userImageUrl = localStorage.getItem('userImageUrl');
    const displayName = localStorage.getItem('displayName');

    setUser({
      userId,
      userImageUrl,
      displayName
    });
  }, [isAuthenticated]);

  const dispatch = useDispatch();
  const handleSignWithGoogle = async () => {
    const { userId, userImageUrl, displayName, userData, receivedStreaks }: any = await signInWithGoogle();

    dispatch(updateIsAuthenticated(true));

    if (userId) {
      localStorage.setItem('userId', userId);
    }

    if (userImageUrl) {
      localStorage.setItem('userImageUrl', userImageUrl);
    }

    if (displayName) {
      localStorage.setItem('displayName', displayName);
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

    setUser({ userId, userImageUrl, displayName });
  };

  const onHandleLogout = async () => {
    setAnchorEl(null);
    await signOutGoogle();
    dispatch(resetSettings());
    dispatch(resetUserData());
    localStorage.clear();
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    pt: 2,
    px: 4,
  };

  return (
      <div className="ml-2 flex items-center">
        <Popover
            id="click-popover"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
        >
          <div className="py-1">
            <p className="py-1 px-4 text-sm cursor-pointer bg-white hover:bg-gray-200 active:hover:bg-gray-200focus:outline-none" onClick={handleModalOpen}>
              <PersonIcon /><span className="ml-1">Profile</span>
            </p>
            <p className="py-1 px-5 text-sm cursor-pointer bg-white hover:bg-gray-200 active:hover:bg-gray-200 focus:outline-none" onClick={onHandleLogout}>
              <LogoutIcon /><span className="ml-1">Logout</span>
            </p>
          </div>
        </Popover>

        <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
          <Box sx={style}>
              <div className="text-gray-400 uppercase text-sm font-bold">Profile</div>
              <div className="py-4 flex items-center">
                <div>
                  <Image className="rounded-full" src={user.userImageUrl} alt="avt" width="70" height="70"/>
                </div>
                <p className="sm:ml-4 md:ml-6 lg:ml-10 text-xl font-bold">{user.displayName || 'Unknown'}</p>
              </div>
          </Box>
        </Modal>

        {
            user.userId && user.userImageUrl &&
            <Image className="cursor-pointer" onClick={handleClick} src={user.userImageUrl} alt="avt" width="30" height="30"/>
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