import React from 'react';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useSelector } from 'react-redux';

import { getUserData } from 'slices/user-data.slice';

const HeaderStreak: React.FC = () => {
  const userData: any = useSelector(getUserData);

  return (
      <div className="flex items-center justify-center mr-5" style={{ color: userData.streak ? '#F19B38' : '#eee' }}>
        <LocalFireDepartmentIcon/>
        <span style={{ fontFamily: 'Arial-Rounded' }}>{userData.streak || '0'}</span>
      </div>
  );
};

export default HeaderStreak;