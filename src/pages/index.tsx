import { Box, Button, Skeleton } from '@mui/material';
import type { NextPage } from 'next';
import { format, differenceInDays } from 'date-fns';
import {
  dailyGospel,
  dailyPsalm,
  dailyProverbs,
  dailyBible,
  dailyActs
} from '../constant';
import React, { useEffect } from 'react';

interface ISettings {
  startDate: number | Date;
}

const Home: NextPage = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [settings, setSettings]: [ISettings, Function] = React.useState({
    startDate: new Date()
  });
  const [day, setDay] = React.useState(0);
  useEffect(() => {
    const _settings = localStorage.getItem('settings');
    if (_settings) {
      console.log('test', _settings);

      setSettings(JSON.parse(_settings || 'null'));
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setDay(differenceInDays(new Date(), new Date(settings.startDate)));
  }, [settings]);

  console.log({ day })

  const plans = {
    gospel: dailyGospel[day % dailyGospel.length],
    psalms: dailyPsalm[day % dailyPsalm.length],
    proverbs: dailyProverbs[day % dailyProverbs.length],
    bible: dailyBible[day % dailyBible.length],
    acts: dailyActs[day % dailyActs.length]
  };

  return (
      <>
        <Box>
          <div className="py-4 px-6 rounded-md w-1/2" style={{ backgroundColor: '#5A89AD', margin: '0 auto' }}>

            <p className="p-1 text-center rounded-sm font-bold text-2xl"
               style={{ backgroundColor: '#4C7693' }}> {format(new Date(),
                'PPP')}</p>

            {
                !isLoaded &&
                <div className="mt-5">
                  <Skeleton animation="wave"/>
                  <Skeleton animation="wave"/>
                  <Skeleton animation="wave"/>
                  <Skeleton animation="wave"/>
                  <Skeleton animation="wave"/>
                </div>
            }
            {
                isLoaded &&
                <div className="mt-5">
                  <p className="mt-2">
                    <span className="text-xl font-bold">Bible: </span>
                    <span className="book">{plans.bible}</span>
                  </p>

                  <p className="mt-2">
                    <span className="text-xl font-bold">Psalms: </span>
                    <span className="book">{plans.psalms}</span>
                  </p>

                  <p className="mt-2">
                    <span className="text-xl font-bold">Proverbs: </span>
                    <span className="book">{plans.proverbs}</span>
                  </p>

                  <p className="mt-2">
                    <span className="text-xl font-bold">Gospel: </span>
                    <span className="book">{plans.gospel}</span>
                  </p>

                  <p className="mt-2">
                    <span className="text-xl font-bold">Acts: </span>
                    <span className="book">{plans.acts}</span>
                  </p>
                </div>
            }
          </div>
        </Box>
      </>
  );
};

export default Home;
