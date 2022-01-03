import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { Box, CircularProgress } from '@mui/material';

import Header from './header';

const AppLayout: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => setIsLoading(true));
    Router.events.on('routeChangeComplete', () => setIsLoading(false));

    return () => {
      Router.events.off('routeChangeStart', () => setIsLoading(true));
      Router.events.off('routeChangeComplete', () => setIsLoading(false));
    };
  }, [isLoading]);

  return (
      <>
        {isLoading ? (
            <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '100vh',
                  width: '100%',
                  backgroundColor: '#457CA3'
                }}
            >
              <CircularProgress size={70}/>
            </Box>
        ) : (
            <Box
                sx={{
                  minHeight: '100vh',
                  width: '100%',
                  backgroundColor: '#457CA3',
                  color: '#fff',
                  fontFamily: 'Roboto Mono',
                  fontSize: '18px'
                }}
                className="p-3"
            >
              <Header/>

              <div className="mt-10">
                {children}
              </div>

            </Box>
        )}
      </>
  );
};

export default AppLayout;
