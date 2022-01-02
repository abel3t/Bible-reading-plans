import { Box } from "@mui/material";
import type { NextPage } from "next";
import { format, differenceInDays } from "date-fns";
import {
  dailyGospel,
  dailyPsalm,
  dailyProverbs,
  dailyBible,
  dailyActs,
} from "../constant";

const Home: NextPage = () => {
  const day = differenceInDays(new Date(), new Date("January 1, 2022"));

  const plans = {
    gospel: dailyGospel[day % dailyGospel.length],
    psalms: dailyPsalm[day % dailyPsalm.length],
    proverbs: dailyProverbs[day % dailyProverbs.length],
    bible: dailyBible[day % dailyBible.length],
    acts: dailyActs[day % dailyActs.length],
  };

  return (
    <>
      <Box>
        <p className="logan">DAILY BIBLE READING</p>

        <div className="app-content">
          <p className="today"> {format(new Date(), "PPP")}</p>

          <div className="books">
            <p>
              <span className="title">Bible: </span>
              <span className="book">{plans.bible}</span>
            </p>

            <p>
              <span className="title">Psalms: </span>
              <span className="book">{plans.psalms}</span>
            </p>

            <p>
              <span className="title">Proverbs: </span>
              <span className="book">{plans.proverbs}</span>
            </p>

            <p>
              <span className="title">Gospel: </span>
              <span className="book">{plans.gospel}</span>
            </p>

            <p>
              <span className="title">Acts: </span>
              <span className="book">{plans.acts}</span>
            </p>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Home;
