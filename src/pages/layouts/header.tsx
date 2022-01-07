import React from 'react';
import HeaderSettings from 'components/HeaderSettings';
import HeaderStreak from 'components/HeaderStreak';
import Auth from 'components/Auth';

const Header: React.FC = () => {
  return (
      <div className="flex content-center items-center xs:3/4 md:w-2/3 lg:w-1/2 border-solid border-b-2 p-2"
           style={{ margin: '0 auto', borderColor: '#3E6F92' }}>
        <div className="text-md md:text-2xl">DAILY BIBLE READING</div>
        <div className="grow flex justify-end">
          <HeaderStreak />
          <HeaderSettings />
          <Auth />
        </div>
      </div>
  );
};

export default Header;