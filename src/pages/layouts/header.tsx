import React, { useEffect } from 'react';
import { Backdrop, Button, Modal, Box, TextField } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import SettingsIcon from '@mui/icons-material/Settings';
import enLocale from 'date-fns/locale/en-US';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings, updateSettings } from '../../slices/settings.slice';

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());

  const dispatch = useDispatch();

  useEffect(() => {
    const _settings: any = JSON.parse(localStorage.getItem('settings') || 'null');
    if (_settings) {
      dispatch(updateSettings(_settings));
      setStartDate(new Date(_settings.startDate));
    } else {
      localStorage.setItem('settings', JSON.stringify({ startDate: new Date() }));
    }
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

    localStorage.setItem('settings', JSON.stringify(newSettings));

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
      <div className="flex content-center items-center xs:3/4 md:w-2/3 lg:w-1/2 border-solid border-b-2 p-2"
           style={{ margin: '0 auto', borderColor: '#3E6F92' }}>
        <div className="text-md md:text-2xl">DAILY BIBLE READING</div>
        <div className="grow flex justify-end">
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
                        mask="__ ___, ____"
                        inputFormat="MMMM dd, yyyy"
                        value={startDate}
                        label="Start Date"
                        onChange={(newDate: any) => setStartDate(newDate)}
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

          <Button variant="contained" className="text-white text-sm capitalize font-normal" style={{backgroundColor: '#6C97B5'}} onClick={handleOpen}>
            <SettingsIcon />
            <span>Settings</span>
          </Button>
        </div>
      </div>
  );
};

export default Header;