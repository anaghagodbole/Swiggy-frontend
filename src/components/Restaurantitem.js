import React,{Component} from'react';
import '../App.css';
import axios from '../utils/axios';
import ItemModal from './ItemModal';
import Listresto from './Listresto';
import Ordermodel from './Ordermodel'
class Restaurantitem extends Component{
  constructor(props){
      super(props);
        this.state={
            name : "",
            address:"",
            restaurantItemList: [],
            modalIsOpen: false,
        }
  }

  handleClick = (event) =>{
    this.setState({ modalIsOpen:true});
  }

  
  onRequestClose =() =>{
    this.setState({modalIsOpen:false})
    this.getItems();
  }

    
  getItems = () =>{
    const id=this.props.match.params.id
    console.log(id)
    axios.get(''+id+'/restaurantitem/').then( ({data}) =>{
    // console.log(data)
    // console.log(data.name)
    //  this.setState({restaurantItemList:data})
    //set name,address,list
      this.setState({name:data.name,address:data.address,restaurantItemList:data.Items})
    }).catch(error => {
        console.log(error);
    })
    }

  
  componentDidMount(){
       this.getItems();
    }

  deleteItem =(id) =>{
    let index=0;
    axios.post(''+id+'/itemdel/').then(response => {
    for(let i=0;i<this.state.restaurantItemList.length;i++){
        if(id === this.state.restaurantItemList[i].id){
            index=i;
        }
    }

    const {restaurantItemList} =this.state;
    restaurantItemList.splice(index,1);
    this.setState({restaurantItemList})

    }).catch(error => {
          console.log(error)
          
    })

  }

  submitData = (item,price) =>{
     
    const id=this.props.match.params.id;
    const obj={abc:item,xyz:price}
    axios.post(''+id+'/restaurantusingid/',obj).then(response =>{
      console.log(response)
         this.getItems();
        }).catch(error =>{
         console.log(error)
        })
  }

  placeOrder = () =>{
    const List=[];
    const id=this.props.match.params.id;
    const {restaurantItemList} =this.state;
    console.log(restaurantItemList)
    for(let i=0;i<restaurantItemList.length;i++){
        if(restaurantItemList[i].count> 0){
         const obj={count:restaurantItemList[i].count,
                 itemid:restaurantItemList[i].id}
         List.push(obj);
         
      }
    }


   // this.setState({restaurantItemList})
      axios.post(''+id+'/addOrder/',List).then(response=>{
      console.log(response)
      //this.getItems();
    }).catch(error =>{
      console.log(error)
    })
    
  }

  decrementCount =(items) =>{
    const {restaurantItemList}=this.state;
    items.count -=1;
    this.setState({restaurantItemList})
  }

  
  incrementCount = (items) =>{
    //menu items [{name:"dosa",price:"200",count:1}]
    //fetch the clicked item - X
    //extract count variable if present, otherwise init.
    //increment count.
    //set new count to clicked item
    //set state.
    const {restaurantItemList} =this.state;
    // if(!items.count) {
    // items.count=0;
    // items.count += 1; 
    // }
    // else items.count += 1; 
     if(!items.count) items.count=0;
     items.count += 1; 

    // else items.count +=1;
    // index=items.id;
    //this.setState({restaurantItemList:restaurantItemList}) 
    //for(let i=0;i<this.state.restaurantItemList.length;i++){
    //if(items.id==this.state.restaurantItemList[i].id){
    this.setState({restaurantItemList})
    
    //   }  
    // }
    console.log(items)
  } 

  renderRestaurant = () =>{
    const {restaurantItemList} = this.state;
    const mapped=restaurantItemList.map((items) => {
     return (
        <div className="col-sm-3 rowpad " key={items.id}>
        <div className="card">
        {this.props.history.location.state.SecondFlag ?
        <button type="button" className="btn btn-danger bsize" onClick ={() => {this.deleteItem(items)}}>Delete</button> : null }
        <button type="button" className="btn btn-warning bsize" onClick={ ()=>{this.incrementCount(items)}}>
        {items.count > 0 ? items.count : '+'}
        </button>   
        <button type="button" className="btn btn-warning bsize" onClick ={()=>{this.decrementCount(items)}}>-</button>
        <div className="card-body div">
        <label>Item</label>
        <h5>{items.nameofitem}</h5>
        <label>Price</label>
        <h5>{items.price}</h5>   
        </div>
        </div>
        </div>
      );
    });
    console.log(restaurantItemList)
    return mapped;
  }

    render(){
        console.log("...........")
        console.log(this.props.history.location.state.SecondFlag)
        const check=this.state.restaurantItemList.filter((check) => !!check.count)
          
        
        return(
          <div className="App">
          <h1 style={{color:"orange"}}  className="size">Swiggy </h1>
          {this.props.history.location.state.SecondFlag ? <button className="btn btn-dark btn-lg right"  onClick={this.handleClick}>Add Items</button> :null }
         
          <div className="container div ">
          
          <label >Restaurant Name:</label>
          <h5>{this.state.name}</h5>
          <label>Restaurant Address</label>
          <h5>{this.state.address}</h5>

         <div className="container div ">
          <div className="row">
              {this.renderRestaurant()}
            
          </div>
        { check[0]== null ? null:<button className="btn btn-dark" onClick={this.handleClick}>SHOW ORDER</button>   }
          <ItemModal modalIsOpen={this.state.modalIsOpen}   onRequestClose={this.onRequestClose} submitData={this.submitData} />
          <Ordermodel modalIsOpen={this.state.modalIsOpen}  onRequestClose={this.onRequestClose}  restaurantItemList={this.state.restaurantItemList} placeOrder={this.placeOrder}/>
          </div>               
           
        </div>
        </div>
            
        )}
  }
  
  


export default Restaurantitem;