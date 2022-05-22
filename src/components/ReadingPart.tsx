import React from 'react';
import { Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getReceivedStreaks, getUserData, updateReceivedStreaks, updateUserData } from 'slices/user-data.slice';
import { unixLocalTimeStartDate } from 'utils/datetime';
import { defaultPlanParts } from '../constant';

interface IReadingPartProps {
  id: string,
  title: string,
  content: string
}

export default function ReadingPart({ id, title, content }: IReadingPartProps) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const receivedStreaks = useSelector(getReceivedStreaks);

  const startOfDayUnix = unixLocalTimeStartDate();
  const startOfYesterdayUnix = startOfDayUnix - 86400;

  const onChangeChecked = async (event: any) => {
    const todayCompletedParts: any = userData?.completedParts?.[startOfDayUnix] || {};
    const newCompletedParts = {
      ...todayCompletedParts,
      [id]: !!event.target?.checked
    };
    const yesterdayReceivedStreak = receivedStreaks[startOfYesterdayUnix] || false;

    const completedParts = Object.values(newCompletedParts).filter((isCompleted: any) => !!isCompleted);
    let streak = userData.streak || 0;
    let newReceivedStreaks: Record<string, boolean> = { ...receivedStreaks };

    if (completedParts.length === defaultPlanParts.length && !receivedStreaks[startOfDayUnix]) {
      ++streak;
      newReceivedStreaks = {
        [startOfYesterdayUnix]: yesterdayReceivedStreak,
        [startOfDayUnix]: true
      };
    } else if (receivedStreaks[startOfDayUnix]) {
      streak = streak > 0 ? streak - 1 : 0;

      newReceivedStreaks = {
        [startOfYesterdayUnix]: yesterdayReceivedStreak,
        [startOfDayUnix]: false
      };
    }

    const newUserData = {
      ...userData,
      completedParts: {
        [startOfDayUnix]: {
          ...newCompletedParts
        }
      },
      streak
    };

    localStorage.setItem('receivedStreaks', JSON.stringify(newReceivedStreaks));
    localStorage.setItem('users', JSON.stringify(newUserData));

    dispatch(updateReceivedStreaks(newReceivedStreaks));
    dispatch(updateUserData(newUserData));
  };

  return (
      <div className="mt-2 flex justify-between">
        <div>
          <span className="text-xl font-bold">{title}: </span>
          <span className="book">{content}</span>
        </div>

        <Checkbox
            {...label}
            checked={!!userData?.completedParts?.[startOfDayUnix]?.[id]}
            onChange={onChangeChecked}
            style={{ color: !!userData?.completedParts?.[startOfDayUnix]?.[id] ? '#457CA3' : '#fff' }}
        />
      </div>
  );
};