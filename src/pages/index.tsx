import { Slider } from "@mui/material";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Slider aria-label="Volume" value={1} onChange={() => console.log("x")} />
    </>
  );
};

export default Home;
