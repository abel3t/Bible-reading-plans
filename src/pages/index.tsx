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
  const day = differenceInDays(
    new Date("January 1, 2023"),
    new Date("January 1, 2022")
  );

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
        <p>DAILY BIBLE READING</p>

        <div>
          <p>{format(new Date(), "PPP")}</p>

          <div>
            <p>
              <span>Gospel: </span>
              <span>{plans.gospel}</span>
            </p>

            <p>
              <span>Psalms: </span>
              <span>{plans.psalms}</span>
            </p>

            <p>
              <span>Proverbs: </span>
              <span>{plans.proverbs}</span>
            </p>

            <p>
              <span>Acts: </span>
              <span>{plans.acts}</span>
            </p>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Home;
