import React from 'react';
import { useSelector } from 'react-redux';

import Skeleton from '../components/Skeleton.tsx';
import PizzaBlock from '../components/PizzaBlock/index.tsx';
import Pagination from '../components/Pagination/index.tsx';
import { selectFilter, setCategoryId, setCurrentPage } from '../Redux/filterSlice.ts';
import Categories from '../components/Categories.tsx';
import { fetchPizzas, selectPizzaData } from '../Redux/pizzaSlice.ts';
import { useAppDispatch } from '../Redux/store.ts';
import SortPopUp from '../components/Sort.tsx';
const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);

  import('../components/utils/math.ts').then((math) => {
    console.log(math.add(16, 26));
  });

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

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

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopUp value={sort} />
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
