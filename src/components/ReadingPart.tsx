import React from 'react';
import { Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, updateUserData } from 'slices/user-data.slice';
import { unixLocalTimeStartDate } from 'utils/datetime';
import { defaultPlanParts } from '../constant';
import { setPathValue } from '../services/firebase';

interface IReadingPartProps {
  id: string,
  title: string,
  content: string
}

export default function ReadingPart({ id, title, content }: IReadingPartProps) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const startOfDayUnix = unixLocalTimeStartDate();
  const startOfYesterdayUnix = startOfDayUnix - 86400;

  const onChangeChecked = async (event: any) => {
    const todayCompletedParts: any = userData?.completedParts?.[startOfDayUnix] || {};
    const newCompletedParts = {
      ...todayCompletedParts,
      [id]: !!event.target?.checked
    };

    const completedParts = Object.values(newCompletedParts).filter((isCompleted: any) => !!isCompleted);
    let { streak, receivedStreak } = userData;

    if (completedParts.length === defaultPlanParts.length && !receivedStreak[startOfDayUnix]) {
      ++streak;
      receivedStreak = {
        [startOfYesterdayUnix]: receivedStreak[startOfYesterdayUnix] || false,
        [startOfDayUnix]: true
      }
    } else if (receivedStreak[startOfDayUnix]) {
      --streak;
      receivedStreak = {
        [startOfYesterdayUnix]: receivedStreak[startOfYesterdayUnix] || false,
        [startOfDayUnix]: false
      }
    }

    const newUserData = {
      ...userData,
      completedParts: {
        [startOfDayUnix]: {
          ...newCompletedParts
        }
      },
      streak,
      receivedStreak
    };

    const userId: string = localStorage.getItem('userId') || '';

    await setPathValue(`users/${userId}`, newUserData);

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