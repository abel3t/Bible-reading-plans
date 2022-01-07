import { unixLocalTimeStartDate } from './datetime';
import { getPathValue, setPathValue } from '../services/firebase';

export async function getReceivedStreaks(userId: string) {
  const startOfDayUnix = unixLocalTimeStartDate();
  const startOfYesterdayUnix = startOfDayUnix - 86400;

  if (!userId) {
    return {
      [startOfYesterdayUnix]: false,
      [startOfDayUnix]: false
    };
  }

  const yesterdayReceivedStreak: any = await getPathValue(`receivedStreaks/${userId}/${startOfYesterdayUnix}`);
  const todayReceivedStreak: any = await getPathValue(`receivedStreaks/${userId}/${startOfDayUnix}`);

  const receivedStreaks = {
    [startOfYesterdayUnix]: yesterdayReceivedStreak || false,
    [startOfDayUnix]: todayReceivedStreak || false
  };

  if (yesterdayReceivedStreak === null) {
    setPathValue(`receivedStreaks/${userId}/${startOfYesterdayUnix}`, false).then(() => true);
  }

  if (todayReceivedStreak === null) {
    setPathValue(`receivedStreaks/${userId}/${startOfDayUnix}`, false).then(() => true);
  }

  return receivedStreaks;
}