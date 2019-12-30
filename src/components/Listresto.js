import React,{Component} from 'react';
import '../App.css';
import axios from '../utils/axios';
import RestoModal from './RestoModal';


class Listresto extends Component{
  constructor(props){
      super(props);
      this.state = {
        restaurantList : [],
        name : "",
        address : "",
        menuList : [],
        modalIsOpen: false,
        flag:null,
      //  this.handleClick = this.handleClick.bind(this);
      }
  }

  getRestaurant = () =>{                      //fetch data from server
    axios.get('').then((response) => {
      const {data} = response;
      this.setState({restaurantList : data});
     }).catch(error => {
      console.log(error);
  })
  }  

  componentDidMount() {
    this.getRestaurant();
    var lv=localStorage.getItem("flag")           //To store flag in local storage
    if(lv==null){
      localStorage.setItem("flag",false)
     }
    else if(this.state.flag==null)
    {
      //localStorage.setItem("flag",false);
      var x=localStorage.getItem("flag");
      console.log(x)
      if(x==='false'){
        var y=false;
        this.setState({flag:y})
       }
      else{
        var y=true;
        this.setState({flag:y})
      }
      }
    else{
        var x=localStorage.getItem("flag");
        if(x==='true'){
        var y=true;
        this.setState({flag:y})
      }
      else{
       var y=false;
       this.setState({flag:y})  }
    }
  }


  takeRestaurant = (id) => {     //navigate to next URL
     console.log(id)
     console.log(this.props)
     const {flag}= this.state;
     this.props.history.push(''+id+'/restaurantitem',{SecondFlag:flag})
}

  handleClick=(event)=>{
  this.setState({modalIsOpen:true})
}



  onRequestClose =() =>{
    this.setState({modalIsOpen:false})
  }


submitData =(name,address) =>{     //store data to servers database
  //console.log(name)
  //console.log(address)
  const obj ={abc:name,xyz:address}
  console.log(obj)
  axios.post('/restaurantusingp/',obj).then(response => {
    console.log(response)
      this.getRestaurant();
  }).catch(error =>{
    console.log(error)
  })
 }

deleteRestaurant = (id) => {

  let index=0;
  axios.post(''+id+'/restaurantdel/').then(response =>{
   // console.log(response)
   // const {restaurantList}=this.state;
   // delete restaurantList[id];
   // this.setState({restaurantList:restaurantList})
   for (let i=0;i< this.state.restaurantList.length;i++){
         if(id === this.state.restaurantList[i].id){
          index=i;
         }
   
   }
   console.log(index)
   const {restaurantList}=this.state;
   restaurantList.splice(index,1);
   this.setState({restaurantList});

  
  }).catch(error=>{
    console.log(error)
  })
}

toggleButton = () =>{
localStorage.setItem("flag",true)
this.setState({flag:true})
}

toggleButtonuser =()=>{
  localStorage.setItem("flag",false)
  this.setState({flag:false})
 }

renderRestaurants = () => {
    const {restaurantList} = this.state;
    //  const list = this.state.restaurantList;
    //  const restaurantList = this.state.restaurantList;
    //  const url = this.state.url;
    //  const {restaurantList,url,name} = this.state;
    const mapped=restaurantList.map((restaurant) => {
          return(
              <div className="col-sm-3 rowpad " key={restaurant.id}>
                  <div className="card">
                  { this.state.flag ? <button type="button" className="btn btn-danger bsize" onClick={()=>{this.deleteRestaurant(restaurant.id)}}>Delete</button> : null}
                   <div className="card-body div">
                      <label>Restaurant Name:</label>
                      <h5>{restaurant.name}</h5>
                      <br></br>
                      <label>Address:</label>
                      <h5>{restaurant.address}</h5>
                      <button className="btn btn-dark"  onClick={() =>{this.takeRestaurant(restaurant.id)}}>Menu</button>
                  </div>
                </div>
              </div>
          );
      });
      return mapped;
  }
  render(){
       // console.log(this.props.rname)
      // console.log(this.props.rname)
      console.log(this.state.flag)
      console.log(localStorage.getItem("flag"))
      console.log("........")

      return(
        <div className="App">
        <h1 style={{color:"orange"}} className="div size ">Swiggy </h1>
        <button className="btn btn-dark" onClick={this.toggleButtonuser}>User</button>
        <button className="btn btn-dark" onClick={this.toggleButton}>Admin</button>
        {this.state.flag ?  <button className="btn btn-dark btn-lg right"  onClick={this.handleClick}>Add Restaurant</button>:null}
       
        <h2 className="left divv">Popular restaurants in and around pune</h2>
        <div className="container div App-body ">
          <div className="row">
            {this.renderRestaurants()}
         </div>
         <RestoModal modalIsOpen={this.state.modalIsOpen} onRequestClose={this.onRequestClose}  submitData={this.submitData} />
      </div>
      </div>
          
      )}
}

export default Listresto;
