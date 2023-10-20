import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://813cecfc1deed960.mokky.dev/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Loading.......';
  }

  return (
    <>
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </>
  );
};

export default FullPizza;
