import React from 'react';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'
import Test from './pages/Teste'

export default function Routes(){
  return(

  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/test" exact component={Test} />
      <Route path='/privacy-policy' component={() => { 
         window.location.href = 'https://example.com/1234'; 
        return null;
      }}/>
    </Switch>
  </BrowserRouter>
  );
}