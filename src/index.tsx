import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import NotFound from './pages/NotFound.tsx';
// import Cart from './pages/Cart.tsx';
// import FullPizza from './pages/FullPizza.tsx';
import { Provider } from 'react-redux';
import { store } from './Redux/store.ts';
import MainLayout from './layouts/MainLayout.tsx';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart.tsx'));
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza.tsx'),
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound.tsx'),
);

const router = createBrowserRouter([
  {
    path: '/',

    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <App />,
        errorElement: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </React.Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </React.Suspense>
        ),
      },

      {
        path: 'pizza/:id',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <FullPizza />
          </React.Suspense>
        ),
      },
    ],
  },
]);

const rootElem = document.getElementById('root');

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  // const root = ReactDOM.createRoot();
  root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
