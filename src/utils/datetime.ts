import { getUnixTime, startOfDay } from 'date-fns';

export function unixTime(date?: Date): number {
  const dateTime = date || new Date();
  return getUnixTime(
      Date.UTC(
          dateTime.getFullYear(),
          dateTime.getMonth(),
          dateTime.getDate(),
          dateTime.getHours(),
          dateTime.getMinutes(),
          dateTime.getSeconds()
      )
  );
}

export function unixStartDate(date?: Date): number {
  const dateTime = date || new Date();
  const day = dateTime.getDate();
  const month = dateTime.getMonth();
  const year = dateTime.getFullYear();

  return getUnixTime(Date.UTC(year, month, day, 0, 0, 0));
}

export function unixLocalTimeStartDate(date?: Date): number {
  return getUnixTime(startOfDay(date || new Date()));
}