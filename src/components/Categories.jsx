import React, { useState } from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories({ categoryId, onClickCategory }) {
  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={categoryId === index ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
