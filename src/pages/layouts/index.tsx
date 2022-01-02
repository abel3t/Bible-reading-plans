import React, { useState, useEffect } from "react";
import Router from "next/router";
import { Box, CircularProgress } from "@mui/material";

const AppLayout: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => setIsLoading(true));
    Router.events.on("routeChangeComplete", () => setIsLoading(false));

    return () => {
      Router.events.off("routeChangeStart", () => setIsLoading(true));
      Router.events.off("routeChangeComplete", () => setIsLoading(false));
    };
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <CircularProgress size={70} />
        </Box>
      ) : (
        <Box
          sx={{
            minHeight: "100vh",
            width: "100%",
            padding: "0 2em",
          }}
        >
          {children}
        </Box>
      )}
    </>
  );
};

export default AppLayout;
