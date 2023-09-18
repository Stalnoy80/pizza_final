import React, { useState } from 'react';

const PizzaBlock = ({ title, price, imageUrl, sizes, types }) => {
  const typeNames = ['тонкое', 'традиционное'];

  const [activeType, setAсtiveType] = useState(0);
  const [activeSize, setActiveSize] = useState('');

  console.log(activeSize);

  const [pizzaCount, setPizzaCount] = useState(0);

  const onClickAdd = () => {
    setPizzaCount(pizzaCount + 1);
  };

  // const onClickDel = () => {
  //   setPizzaCount(pizzaCount - 1);
  // };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              onClick={() => setAсtiveType(typeId)}
              className={activeType === typeId ? 'active' : ''}>
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((value, i) => (
            <li
              key={i}
              onClick={() => {
                setActiveSize(i);
              }}
              className={activeSize === i ? 'active' : ''}>
              {value} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__buttons">
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price}₽</div>
          <button className="button button--outline button--add" onClick={onClickAdd}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{pizzaCount}</i>
          </button>
        </div>
        {/* <div className="button button--outline2">
          <svg onClick={onClickDel} width="32" height="26" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.0402 15.04H19.8402C20.3704 15.04 20.8002 15.4698 20.8002 16C20.8002 16.5302 20.3704 16.96 19.8402 16.96H15.0402H12.1602C11.63 16.96 11.2002 16.5302 11.2002 16C11.2002 15.4698 11.63 15.04 12.1602 15.04H15.0402Z"
              fill="#FE5F1E"
            />
          </svg>
        </div> */}
      </div>
    </div>
  );
};

export default PizzaBlock;
