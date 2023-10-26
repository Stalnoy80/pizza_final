import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Sort, { sortList } from '../components/Sort.tsx';
import Skeleton from '../components/Skeleton.tsx';
import PizzaBlock from '../components/PizzaBlock/index.tsx';
import Pagination from '../components/Pagination/index.tsx';
import {
  FilterSliceState,
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../Redux/filterSlice.ts';
import Categories from '../components/Categories.tsx';
import { SearchPizzaParams, fetchPizzas, selectPizzaData } from '../Redux/pizzaSlice.ts';
import { useAppDispatch } from '../Redux/store.ts';
const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Если изменили параметры и был первый рендер
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  // // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[1],
  //       }),
  //     );
  //   }
  //   isSearch.current = true;
  // }, []);

  const getPizzas = async () => {
    const sortBy = sort.sortProperty;
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue ? `&title=*${searchValue}*` : '';
    dispatch(
      //@ts-ignore
      fetchPizzas({ category, search, sortBy, currentPage: String(currentPage) }),
    );

    window.scroll(0, 0);
  };

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить ПИЦЦЫ 🫣🫣🫣. Попробуйте повторить попытку позже!</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
