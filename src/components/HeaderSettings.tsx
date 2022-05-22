import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, Box, Button, Modal, Skeleton, TextField } from '@mui/material';
import enLocale from 'date-fns/locale/en-US';
import SettingsIcon from '@mui/icons-material/Settings';
import SyncIcon from '@mui/icons-material/Sync';
import { getSettings, updateSettings } from 'slices/settings.slice';
import { unixLocalTimeStartDate, unixStartDate } from 'utils/datetime';
import {
  getIsAuthenticated,
  getReceivedStreaks,
  getUserData,
  updateReceivedStreaks,
  updateUserData
} from 'slices/user-data.slice';
import Image from 'next/image';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { setPathValue } from '../services/firebase';

const HeaderSettings: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState(0);
  const [user, setUser]: [any, Function] = useState({});
  const [isSync, setIsSync]: [any, Function] = useState(false);

  const dispatch = useDispatch();

  const settings = useSelector(getSettings);
  const isAuthenticated: boolean = useSelector(getIsAuthenticated);
  const receivedStreaks = useSelector(getReceivedStreaks);
  const userData = useSelector(getUserData);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userImageUrl = localStorage.getItem('userImageUrl');
    const displayName = localStorage.getItem('displayName');
    const settings = JSON.parse(localStorage.getItem('settings') || 'null');
    const receivedStreaks = JSON.parse(localStorage.getItem('receivedStreaks') || '{}');
    const userData = JSON.parse(localStorage.getItem('users') || '{}');
    const startDate = settings?.startDate || unixStartDate();

    dispatch(updateSettings({
      ...(settings || {}),
      startDate
    }));
    dispatch(updateReceivedStreaks(receivedStreaks));
    dispatch(updateUserData(userData));
    setStartDate(startDate);

    setUser({
      userId,
      userImageUrl,
      displayName
    });
  }, [isAuthenticated]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    const newSettings = {
      ...settings,
      startDate
    };

    dispatch(updateSettings(newSettings));
    localStorage.setItem('settings', JSON.stringify(newSettings));

    setOpen(false);
  };

  const handleSyncData = () => {
    setIsSync(true);

    const userId = localStorage.getItem('userId');

    Promise.all([
      setPathValue(`settings/${userId}`, settings),
      setPathValue(`receivedStreaks/${userId}`, receivedStreaks),
      setPathValue(`users/${userId}`, userData)
    ])
        .then(() => console.log('synced'))
        .catch((error) => console.log(error.message));

    setTimeout(() => setIsSync(false), 4000);
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '26%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2
  };

  return (
      <>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
            className="mt-20 sm:mt-10 md:mt-5 lg:mt-3"
        >
          <Box sx={style} className="w-5/6 sm:w-3/4 md:w-2/3 lg:w-2/5">
            <div className="font-bold text-lg mb-2 py-2" style={{ borderBottom: 'solid 1px #ccc' }}>
              Reading Settings
            </div>

            <div className="flex justify-between items-center cursor-pointer" onClick={handleSyncData}>
              <div className="flex">
                {
                    user?.userImageUrl &&
                    <Image className={`rounded-full`} src={user.userImageUrl} alt="avt" width="60" height="60"/>
                }
                <div className="ml-6">
                  <div className="text-lg font-bold">{user?.displayName || ''}</div>
                  <div className="text-md">time</div>
                </div>
              </div>
              <SyncIcon className={`${isSync ? 'rotated-image' : ''}`}/>
            </div>

            <div className="py-2 flex justify-between items-center" style={{ borderBottom: 'solid 1px #ccc' }}>
              <div className="font-bold">Start Date</div>
              {
                  !startDate && <Skeleton animation="wave" width="60%"/>
              }
              {
                  !!startDate && <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
                      <DatePicker
                          openTo="day"
                          views={['day', 'month', 'year']}
                          value={new Date(startDate * 1000)}
                          label="Start Date"
                          onChange={(newDate: any) => setStartDate(unixLocalTimeStartDate(newDate))}
                          renderInput={(params: any) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
              }
            </div>

            <div className="flex justify-end mt-5">
              <Button variant="outlined" className="capitalize" color="primary" onClick={handleSave}
                      disabled={!startDate}>
                Save
              </Button>
            </div>

          </Box>
        </Modal>

        <Button variant="contained" className="text-white text-sm capitalize font-normal"
                style={{ backgroundColor: '#6C97B5' }} onClick={handleOpen}>
          <SettingsIcon/>
          <span>Settings</span>
        </Button>
      </>
  );
};

export default HeaderSettings;