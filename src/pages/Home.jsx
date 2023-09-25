import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/Skeleton';
import PizzaBlock from '../components/PizzaBlock';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

  console.log(categoryId, sortType);

  // const onClickListItem = (i) => {
  //   setSortType(i);
  //   setOpen(false);
  // };

  const category = categoryId > 0 ? `category=${categoryId}` : ``;
  const sortBy = sortType.sortProperty;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://813cecfc1deed960.mokky.dev/items?${category}&sortBy=${sortBy}`)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]); // при обновлении данных помпонент - делается запрос через фетч.

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
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
