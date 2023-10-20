import React from 'react';
import './scss/app.scss';
import Home from './pages/Home';

export const SearchContext = React.createContext();

function App() {
  return <Home />;
}

export default App;
