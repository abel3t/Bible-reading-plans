import { Box, Skeleton } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { format, differenceInDays } from "date-fns";
import WarningIcon from "@mui/icons-material/Warning";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  dailyGospel,
  dailyPsalms,
  dailyProverbs,
  dailyOldTestament,
  dailyNewTestament,
  defaultPlanParts,
} from "../constant";
import { getSettings } from "slices/settings.slice";
import ReadingPart from "components/ReadingPart";
import { unixLocalTimeStartDate } from "utils/datetime";
import {
  getIsAuthenticated,
  updateIsAuthenticated,
} from "../slices/user-data.slice";
import { getTodayPeopleNeedPrayer } from "../utils/shared";

const Home: NextPage = () => {
  const [warn, setWarn] = React.useState(false);
  const [day, setDay] = React.useState(0);
  const [peopleNeedPrayer, setPeopleNeedPrayer]: [string[], any] =
    React.useState([]);

  const settings: any = useSelector(getSettings);
  const dispatch = useDispatch();
  const isAuthenticated: boolean = useSelector(getIsAuthenticated);

  useEffect(() => {
    const today = unixLocalTimeStartDate();
    const todayPrayer: Record<string, any> = JSON.parse(
      localStorage.getItem("todayPrayer") || "{}"
    );
    let { generatedPrayerTime, todayPeopleNeedPrayer } = todayPrayer;

    if (generatedPrayerTime !== today) {
      todayPeopleNeedPrayer = getTodayPeopleNeedPrayer();
      setPeopleNeedPrayer(todayPeopleNeedPrayer);
      localStorage.setItem(
        "todayPrayer",
        JSON.stringify({
          generatedPrayerTime: today,
          todayPeopleNeedPrayer: todayPeopleNeedPrayer,
        })
      );
    } else {
      setPeopleNeedPrayer(todayPeopleNeedPrayer);
    }
  }, []);

  useEffect(() => {
    const today = unixLocalTimeStartDate();
    const startDate = unixLocalTimeStartDate(
      new Date(settings.startDate * 1000)
    );

    const userId = localStorage.getItem("userId");
    const userImageUrl = localStorage.getItem("userImageUrl");

    if (userId && userImageUrl) {
      dispatch(updateIsAuthenticated(true));
    }

    setWarn(today < startDate);
    setDay(
      differenceInDays(
        new Date(today * 1000),
        new Date(settings.startDate * 1000)
      )
    );
  }, [settings]);

  const plans: any = {
    gospel: dailyGospel[day % dailyGospel.length],
    psalms: dailyPsalms[day % dailyPsalms.length],
    proverbs: dailyProverbs[day % dailyProverbs.length],
    oldTestament: dailyOldTestament[day % dailyOldTestament.length],
    newTestament: dailyNewTestament[day % dailyNewTestament.length],
  };

  return (
    <>
      <Box>
        <Head>
          <title>Daily Reading Bible</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <div
          className="py-4 px-6 rounded-md sm:w-3/4 md:w-2/3 lg:w-1/2"
          style={{ backgroundColor: "#5A89AD", margin: "0 auto" }}
        >
          <p
            className="p-1 text-center rounded-sm font-bold text-2xl"
            style={{ backgroundColor: "#4C7693" }}
          >
            {" "}
            {format(new Date(), "PPP")}
          </p>

          {!isAuthenticated && (
            <div>
              <p className="mt-5 text-center text-xl">
                Please login to continue!
              </p>
            </div>
          )}

          {isAuthenticated && warn && (
            <div className="mt-5">
              <div className="text-center text-md">
                <WarningIcon style={{ color: "#F6B818" }} />{" "}
                <span>Start Date is coming...</span>
              </div>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </div>
          )}
          {isAuthenticated &&
            !warn &&
            defaultPlanParts.map(({ id, abbr, title }, index: number) => {
              return (
                <ReadingPart
                  key={index}
                  content={plans[abbr]}
                  id={id}
                  title={title}
                />
              );
            })}
        </div>

        <div
          className="mx-10 py-4 px-6 rounded-md sm:w-3/4 md:w-2/3 lg:w-1/2"
          style={{ backgroundColor: "#5A89AD", margin: "20px auto" }}
        >
          <p
            className="p-1 text-center rounded-sm font-bold text-2xl"
            style={{ backgroundColor: "#4C7693" }}
          >
            Today&apos;s Prayer
          </p>
          <div className="grid grid-cols-4 gap-3 justify-items-center">
            {peopleNeedPrayer.map((name: string, index) => (
              <People name={name} key={index} />
            ))}
          </div>
        </div>
      </Box>
    </>
  );
};

interface IPeople {
  name: string;
}

const People = ({ name }: IPeople) => {
  return (
    <div className="mt-2 flex justify-between">
      <div>
        <span className="text-xl font-bold">{name}</span>
      </div>
    </div>
  );
};

export default Home;
