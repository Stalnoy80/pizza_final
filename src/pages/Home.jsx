import React, { useContext, useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

  // const onClickListItem = (i) => {
  //   setSortType(i);
  //   setOpen(false);
  // };
  const { searchValue } = useContext(SearchContext);

  console.log('home перерисовался');

  const category = categoryId > 0 ? `category=${categoryId}` : ``;
  const sortBy = sortType.sortProperty;
  const search = searchValue ? `&title=*${searchValue}*` : '';

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://813cecfc1deed960.mokky.dev/items?${category}&sortBy=${sortBy}${search}&page=${currentPage}&limit=4`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr.items);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]); // при обновлении данных помпонент - делается запрос через фетч.
  //важно не забывать добавлять в юзреф компоненты для обновления!

  // .filter((obj) => obj.title.toLowerCase().includes(searchValue)) // includes - строка есть в названии = true // фильтрация в статическом массиве
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />); //*OBJ - спред массива свойств*/

  const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? sceletons // генерация псевдо массива для скелетона.
          : pizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
