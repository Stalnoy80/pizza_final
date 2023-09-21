import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/Skeleton';
import PizzaBlock from '../components/PizzaBlock';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(55);
  const [sortType, setSortType] = useState(0);

  const onClickCategory = (index) => {
    setCategoryId(index);
  };

  // const onClickListItem = (i) => {
  //   setSortType(i);
  //   setOpen(false);
  // };

  useEffect(() => {
    fetch('https://813cecfc1deed960.mokky.dev/items')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} sortType={sortType} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        {/*OBJ - спред массива свойств*/}
      </div>
    </>
  );
};

export default Home;
