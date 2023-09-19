import React from 'react';
import Header from '../components/Header';
import NotFoundBlock from '../components/NotFoundBlock';

const Cart = () => {
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

export default Cart;
