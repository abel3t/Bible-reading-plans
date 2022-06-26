import { unixLocalTimeStartDate } from './datetime';
import { getPathValue, setPathValue } from '../services/firebase';
import { spiritualFamilyPeople } from '../constant';

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

export function getTodayPeopleNeedPrayer(): string[] {
  const MAX_PEOPLE = 5;
  const NUMBER_OF_PEOPLE = spiritualFamilyPeople.length;
  const peopleNeedPrayerMap: Record<string, boolean> = {};

  for (let i = 0; i < MAX_PEOPLE; i++) {
    let randNum = -1;
    do {
      randNum = Math.floor(Math.random() * NUMBER_OF_PEOPLE);
    } while (peopleNeedPrayerMap[randNum]);

    peopleNeedPrayerMap[randNum] = true;
  }

  return spiritualFamilyPeople.filter((_, index) => peopleNeedPrayerMap[index]);
}