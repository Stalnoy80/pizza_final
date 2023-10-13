import React, { useState } from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = useState(''); //привет
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Home />
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
