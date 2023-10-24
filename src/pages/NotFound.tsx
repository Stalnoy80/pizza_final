import React from 'react';
import NotFoundBlock from '../components/NotFoundBlock/index.tsx';
import Header from '../components/Header.tsx';

const NotFound: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <NotFoundBlock />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
