import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Test from './pages/Test';

import { Provider } from 'react-redux';
import { store } from './Redux/store';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',

    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <App />,
        errorElement: <NotFound />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'test',
        element: <Test />,
      },
      {
        path: 'pizza/:id',
        element: <FullPizza />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
