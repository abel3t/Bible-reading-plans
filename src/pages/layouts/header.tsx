import React from 'react';
import { Button } from '@mui/material';

const Header: React.FC = () => {
  return (
    <div className="flex justify-center w-1/2 border-solid border-b-2 p-2" style={{margin: "0 auto", borderColor: '#3E6F92'}}>
      <div className="text-3xl">DAILY BIBLE READING</div>
    </div>
  );
};

export default Header;