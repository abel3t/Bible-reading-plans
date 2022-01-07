import { Box, Button, Skeleton } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { format, differenceInDays } from 'date-fns';
import WarningIcon from '@mui/icons-material/Warning';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  dailyGospel,
  dailyPsalms,
  dailyProverbs,
  dailyBible,
  dailyActs,
  defaultPlanParts
} from '../constant';
import { getSettings } from 'slices/settings.slice';
import ReadingPart from 'components/ReadingPart';
import { unixLocalTimeStartDate, unixTime } from 'utils/datetime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Home: NextPage = () => {
  const [warn, setWarn] = React.useState(false);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [day, setDay] = React.useState(0);

  const settings: any = useSelector(getSettings);

  useEffect(() => {
    const today = unixTime(new Date());
    const startDate = unixLocalTimeStartDate(new Date(settings.startDate));

    const userId = localStorage.getItem('userId');
    const userImageUrl = localStorage.getItem('userImageUrl');

    if (userId && userImageUrl) {
      setIsAuthenticate(true);
    }

    setWarn(today < startDate);
    setDay(differenceInDays(new Date(), new Date(settings.startDate)));
  }, [settings]);

  const plans: any = {
    gospel: dailyGospel[day % dailyGospel.length],
    psalms: dailyPsalms[day % dailyPsalms.length],
    proverbs: dailyProverbs[day % dailyProverbs.length],
    bible: dailyBible[day % dailyBible.length],
    acts: dailyActs[day % dailyActs.length]
  };

  return (
      <>
        <Box>
          <Head>
            <title>Daily Reading Bible</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
          </Head>

          <div className="py-4 px-6 rounded-md sm:w-3/4 md:w-2/3 lg:w-1/2"
               style={{ backgroundColor: '#5A89AD', margin: '0 auto' }}>

            <p className="p-1 text-center rounded-sm font-bold text-2xl"
               style={{ backgroundColor: '#4C7693' }}> {format(new Date(),
                'PPP')}</p>

            {
              !isAuthenticate &&
                <div>
                  <p className="mt-5 text-center text-xl">Please login to continue!</p>
                </div>
            }

            {
                isAuthenticate && warn &&
                <div className="mt-5">
                  <div className="text-center text-md">
                    <WarningIcon style={{ color: '#F6B818' }}/> <span>Start Date is coming...</span>
                  </div>
                  <Skeleton animation="wave"/>
                  <Skeleton animation="wave"/>
                  <Skeleton animation="wave"/>
                  <Skeleton animation="wave"/>
                  <Skeleton animation="wave"/>
                </div>
            }
            {
              isAuthenticate && !warn &&
                defaultPlanParts.map(({ id, abbr, title }, index: number) => {
                  return <ReadingPart key={index} content={plans[abbr]} id={id} title={title}/>;
                })
            }
          </div>
        </Box>
      </>
  );
};

export default Home;
