import React,{Component} from 'react';
import './App.css';
import Listresto from './components/Listresto';
import Restaurantitem from './components/Restaurantitem'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';


//import axios from './utils/axios';

class App extends Component{

 
    render(){
          // localStorage.setItem("flag",false);
          //to route through browser.
            return(
              <div>
                  <Router>
                    <Switch>
                      <Route path="/" exact component={Listresto} />
                      <Route path="/:id/restaurantitem"  exact component={Restaurantitem} />
                    </Switch>
                  </Router>


              </div>
            );
    }
}


    



export default App;
