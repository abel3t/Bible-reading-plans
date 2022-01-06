import { getUnixTime, startOfDay } from 'date-fns';

export function unixTime(): number {
  const dateTime = new Date();
  const seconds = dateTime.getSeconds();
  const minutes = dateTime.getMinutes();
  const hours = dateTime.getHours();
  const date = dateTime.getDate();
  const month = dateTime.getMonth();
  const year = dateTime.getFullYear();

  return getUnixTime(Date.UTC(year, month, date, hours, minutes, seconds));
}

export function unixStartDate(): number {
  const dateTime = new Date();
  const day = dateTime.getDate();
  const month = dateTime.getMonth();
  const year = dateTime.getFullYear();

  return getUnixTime(Date.UTC(year, month, day, 0, 0, 0));
}

export function unixLocalTimeStartDate(): number {
  return getUnixTime(startOfDay(new Date()));
}