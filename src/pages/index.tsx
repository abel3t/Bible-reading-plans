import { Box, Button } from '@mui/material';
import type { NextPage } from 'next';
import { format, differenceInDays } from 'date-fns';
import {
  dailyGospel,
  dailyPsalm,
  dailyProverbs,
  dailyBible,
  dailyActs
} from '../constant';

const Home: NextPage = () => {
  const day = differenceInDays(new Date(), new Date('January 1, 2022'));

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

            <p className="p-1 text-center rounded-sm font-bold text-2xl" style={{ backgroundColor: '#4C7693' }}> {format(new Date(),
                'PPP')}</p>

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
          </div>
        </Box>
      </>
  );
};

export default Home;
