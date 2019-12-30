import React,{Component} from 'react';
import './App.css';
import axios from '../utils/axios';

class list extends Component{
  constructor(props){
      super(props);
      this.state = {
         restaurantList : [],
        name : "",
        address : "",
        menuList : []
      }
  }
  componentDidMount() {
      axios.get('').then((response) => {
          const {data} = response;
          this.setState({restaurantList : data});
      }).catch(error => {
          console.log(error);
      })
  }
  renderRestaurants = () => {
       const {restaurantList} = this.state;
    //  const list = this.state.restaurantList;
    //  const restaurantList = this.state.restaurantList;
    //  const url = this.state.url;
    //  const {restaurantList,url,name} = this.state;
      const mapped=restaurantList.map((restaurant) => {
          return(
              <div className="col-sm-3 rowpad ">
                  <div className="card">
                  <div className="card-body div">
                      <label>Restaurant Name:</label>
                      <h5>{restaurant.name}</h5>
                      <br></br>
                      <label>Address:</label>
                      <h5>{restaurant.address}</h5>
                      <button className="btn btn-dark" >Order Now</button>
                  </div>
                  </div>
              </div>
          );
      });
      return mapped;
  }
  render(){
      return(
        <div className="App">
        <h1 style={{color:"orange"}}>Swiggy </h1>
        <h2 className="left">Restaurants in Pune</h2>
      <div className="container div ">
          <div className="row">
            {this.renderRestaurants()}
              
          </div>
      </div>
      </div>
          
      )}
}




export default list;
