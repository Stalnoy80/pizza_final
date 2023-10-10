import React, { useContext, useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort, { list, sortList } from '../components/Sort';
import Skeleton from '../components/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../Redux/filterSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);

  const category = categoryId > 0 ? `category=${categoryId}` : ``;
  const search = searchValue ? `&title=*${searchValue}*` : '';

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      // dispatch(setFilters({ ...params, sort }));
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://813cecfc1deed960.mokky.dev/items?${category}&sortBy=${sort.sortProperty}${search}&page=${currentPage}&limit=4`,
      )
      .then((res) => {
        setItems(res.data.items);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]); // при обновлении данных помпонент - делается запрос через фетч.
  //важно не забывать добавлять в юзреф компоненты для обновления!

  useEffect(() => {
    const queryString = qs.stringify({
      sortPropertyl: sort.sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sort, searchValue, currentPage]);

  // .filter((obj) => obj.title.toLowerCase().includes(searchValue)) // includes - строка есть в названии = true // фильтрация в статическом массиве
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />); //*OBJ - спред массива свойств*/

  const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const onClickCategory = (id) => dispatch(setCategoryId(id));

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? sceletons // генерация псевдо массива для скелетона.
          : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
