

import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Homepage from './Homepage';
import Macro from './Macro';
import SampleMeal from './SampleMeal';

import './App.css';



function App(){
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path= "/" exact component={Home}/>
          <Route path= "/Home" exact component={Home}/>
          <Route path= "/MacroCalculator" component={Macro}/>
          <Route path= "/SampleMeal" component={SampleMeal}/>
        </Switch>  
      </div>
    </Router>
    
  );
}
 
const Home = () =>
(
  <div className = "home">
    <Homepage/>
  </div>
);

export default App;
