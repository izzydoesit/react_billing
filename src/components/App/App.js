// @flow

import React from 'react';
import Header from '../Header/Header'
import BILLS from '../../data';
import Totals from '../Totals/Totals';
import BillList from '../BillList/BillList';
import './App.css';

const App = () =>
  
  <div className="App">
    <Header />
    <Totals bills={BILLS}/>
    <BillList bills={BILLS}/>
  </div>

export default App;
