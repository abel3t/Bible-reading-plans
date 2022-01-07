import React, { useEffect } from 'react';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useDispatch, useSelector } from 'react-redux';

import { getUserData, updateReceivedStreaks } from 'slices/user-data.slice';
import { getPathValue, setPathValue } from '../services/firebase';
import { unixLocalTimeStartDate } from '../utils/datetime';

const HeaderStreak: React.FC = () => {
  const userData: any = useSelector(getUserData);
  const dispatch = useDispatch();
  const startOfDayUnix = unixLocalTimeStartDate();
  const startOfYesterdayUnix = startOfDayUnix - 86400;

  const getReceivedStreaksData = async () => {
    const userId = localStorage.getItem('userId') || '';

    const todayReceivedStreak = await getPathValue(`receivedStreaks/${userId}/${startOfDayUnix}`);
    const yesterdayReceivedStreak = await getPathValue(`receivedStreaks/${userId}/${startOfYesterdayUnix}`);

    if (yesterdayReceivedStreak === null) {
      setPathValue(`receivedStreaks/${userId}/${startOfYesterdayUnix}`, false).then(() => true);
    }

    if (todayReceivedStreak === null) {
      await setPathValue(`receivedStreaks/${userId}/${startOfDayUnix}`, false).then(() => true);
    }

    return {
      todayReceivedStreak: todayReceivedStreak ,
      yesterdayReceivedStreak:yesterdayReceivedStreak
    }
  }

  useEffect(() => {
    const startOfDayUnix = unixLocalTimeStartDate();

    const {todayReceivedStreak, yesterdayReceivedStreak}: any = getReceivedStreaksData().then(data => data);
    const receivedStreaks = {
      [startOfYesterdayUnix]: yesterdayReceivedStreak || false,
      [startOfDayUnix]: todayReceivedStreak || false
    };

    dispatch(updateReceivedStreaks(receivedStreaks));
  }, []);

  return (
      <div className="flex items-center justify-center mr-5" style={{ color: userData.streak ? '#F19B38' : '#eee' }}>
        <LocalFireDepartmentIcon/>
        <span style={{ fontFamily: 'Arial-Rounded' }}>{userData.streak || '0'}</span>
      </div>
  );
};

export default HeaderStreak;