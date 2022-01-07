import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, Box, Button, Modal, TextField } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import enLocale from 'date-fns/locale/en-US';
import DatePicker from '@mui/lab/DatePicker';
import SettingsIcon from '@mui/icons-material/Settings';
import { getSettings, updateSettings } from 'slices/settings.slice';
import { getPathValue, setPathValue } from '../services/firebase';
import { unixLocalTimeStartDate } from '../utils/datetime';

const HeaderSettings: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState(unixLocalTimeStartDate(new Date()));

  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem('userId') || '';

    getPathValue(`settings/${userId}/`)
        .then(settings => {
          dispatch(updateSettings(settings));
          setStartDate(settings.startDate);
        })
        .catch(() => {
          setPathValue(`settings/${userId}/`, { startDate: unixLocalTimeStartDate() }).then(() => true);
        });
  }, []);

  const settings = useSelector(getSettings);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    const newSettings = {
      ...settings,
      startDate
    };

    dispatch(updateSettings(newSettings));

    const userId = localStorage.getItem('userId') || '';

    setPathValue(`settings/${userId}`, newSettings).then(() => true);

    setOpen(false);
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
            <div className="py-2 flex justify-between items-center" style={{ borderBottom: 'solid 1px #ccc' }}>
              <div className="font-bold">Start Date</div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>

                  <DatePicker
                      inputFormat="MMMM dd, yyyy"
                      value={new Date(startDate * 1000)}
                      label="Start Date"
                      onChange={(newDate: any) => setStartDate(unixLocalTimeStartDate(newDate))}
                      renderInput={(params: any) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <Button variant="outlined" className="capitalize" color="primary" onClick={handleSave}>
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