import React from 'react';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'
import Test from './pages/Teste01'

export default function Routes(){
  return(

  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/test" exact component={Test} />
       
    </Switch>
  </BrowserRouter>
  );
}