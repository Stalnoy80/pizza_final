import React, { useCallback, useContext, useRef, useState } from 'react';

import styles from './search.module.scss';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

const Search = () => {
  const [value, setValue] = useState('');

  // const { setSearchValue } = useContext(SearchContext); //addEventListener аля
  const inputRef = useRef();

  const onClickClear = () => {
    // setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      // setSearchValue(str);
    }, 1000),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        ref={inputRef}
        value={value} // контролируемый инпут!
        onChange={onChangeInput} // получаем данные из поисковой строки
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          className={styles.deleteIcon}
          onClick={onClickClear}
          fill="#000000"
          width="800px"
          height="800px"
          viewBox="0 0 256 256"
          id="Flat"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M128,20.00012a108,108,0,1,0,108,108A108.12217,108.12217,0,0,0,128,20.00012Zm0,192a84,84,0,1,1,84-84A84.0953,84.0953,0,0,1,128,212.00012Zm40.48535-107.51465L144.9707,128.00012l23.51465,23.51465a12.0001,12.0001,0,0,1-16.9707,16.9707L128,144.97082l-23.51465,23.51465a12.0001,12.0001,0,0,1-16.9707-16.9707l23.51465-23.51465L87.51465,104.48547a12.0001,12.0001,0,0,1,16.9707-16.9707L128,111.02942l23.51465-23.51465a12.0001,12.0001,0,0,1,16.9707,16.9707Z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
