import React, { useEffect } from 'react';
import { Backdrop, Button, Modal, Box, TextField } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import enLocale from 'date-fns/locale/en-US';

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [settings, setSettings] = React.useState({});
  useEffect(() => {
    const _settings = localStorage.getItem('settings');
    if (_settings) {
      setSettings(_settings);
    } else {
      setSettings({
        startDate: new Date()
      });
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    localStorage.setItem('settings', JSON.stringify({
      ...settings,
      startDate
    }));

    setOpen(false);
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '26%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2
  };

  return (
      <div className="flex content-center w-1/2 border-solid border-b-2 p-2"
           style={{ margin: '0 auto', borderColor: '#3E6F92' }}>
        <div className="text-2xl">DAILY BIBLE READING</div>
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
          >
            <Box sx={style}>
              <div className="font-bold text-lg mb-2 py-2" style={{ borderBottom: 'solid 1px #ccc' }}>
                Reading Settings
              </div>
              <div className="py-2 flex justify-between items-center" style={{ borderBottom: 'solid 1px #ccc' }}>
                <div className="font-bold">Start Date</div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>

                    <DatePicker
                        mask="__/__/____"
                        value={startDate}
                        onChange={(newDate: any) => setStartDate(newDate)}
                        renderInput={(params: any) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outlined" className="mt-5" onClick={handleSave}>
                  Save
                </Button>
              </div>

            </Box>
          </Modal>

          <Button variant="outlined" className="text-white" onClick={handleOpen}>Settings</Button>
        </div>
      </div>
  );
};

export default Header;