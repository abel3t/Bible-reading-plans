import { differenceInDays } from "date-fns";
import {
  dailyGospel,
  dailyPsalm,
  dailyProverbs,
  dailyBible,
  dailyActs,
} from "./src/constant";

const day = differenceInDays(
  new Date("January 1, 2023"),
  new Date("January 1, 2022")
);

console.log({
  gospel: dailyGospel[day % dailyGospel.length],
  psalms: dailyPsalm[day % dailyPsalm.length],
  proverbs: dailyProverbs[day % dailyProverbs.length],
  bible: dailyBible[day % dailyBible.length],
  dailyActs: dailyActs[day % dailyActs.length],
});
