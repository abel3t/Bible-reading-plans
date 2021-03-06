import React, { useEffect } from 'react';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useDispatch, useSelector } from 'react-redux';

import { getIsAuthenticated, getReceivedStreaks, getUserData, updateReceivedStreaks } from 'slices/user-data.slice';
import { unixLocalTimeStartDate } from 'utils/datetime';

const HeaderStreak: React.FC = () => {
  const userData: any = useSelector(getUserData);
  const dispatch = useDispatch();
  const startOfDayUnix = unixLocalTimeStartDate();
  const startOfYesterdayUnix = startOfDayUnix - 86400;
  const { todayReceivedStreak, yesterdayReceivedStreak }: any = useSelector(getReceivedStreaks);

  const isAuthenticated = useSelector(getIsAuthenticated);
  useEffect(() => {
    const startOfDayUnix = unixLocalTimeStartDate();
    const { startOfDayUnix: _startOfDayUnix, yesterdayReceivedStreak: _yesterdayReceivedStreak } =
        JSON.parse(localStorage.getItem('users') || '{}');
    const storageReceivedStreaks = JSON.parse(localStorage.getItem('receivedStreaks') || '{}');

    const receivedStreaks = {
      ...storageReceivedStreaks,
      [_startOfDayUnix || startOfYesterdayUnix]: yesterdayReceivedStreak || false,
      [_yesterdayReceivedStreak || startOfDayUnix]: todayReceivedStreak || false
    };

    dispatch(updateReceivedStreaks(receivedStreaks));
  }, [isAuthenticated]);

  return (
      <div className="flex items-center justify-center mr-5" style={{ color: userData.streak ? '#F19B38' : '#eee' }}>
        <LocalFireDepartmentIcon/>
        <span style={{ fontFamily: 'Arial-Rounded' }}>{userData.streak || '0'}</span>
      </div>
  );
};

export default HeaderStreak;