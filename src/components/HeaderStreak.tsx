import React, { useEffect } from 'react';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useDispatch, useSelector } from 'react-redux';

import { getUserData, updateUserData } from 'slices/user-data.slice';

const HeaderStreak: React.FC = () => {
  const userData: any = useSelector(getUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    const _userData: any = JSON.parse(localStorage.getItem('userData') || 'null');

    if (_userData) {
      dispatch(updateUserData(_userData));
    } else {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, []);

  return (
      <div className="flex items-center justify-center mr-5" style={{ color: userData.streak ? '#F19B38' : '#eee' }}>
        <LocalFireDepartmentIcon/>
        <span style={{ fontFamily: 'Arial-Rounded' }}>{userData.streak || '0'}</span>
      </div>
  );
};

export default HeaderStreak;