import React,{Component} from 'react';
import Modal from 'react-modal';
import './RestoModal.css';


class Ordermodel extends Component{
  constructor(props){
        super(props)
        this.state={
        }
    }

   
    displayResto = () =>{
     const List=[];
     const iprice=0;
     const restaurantItemList=this.props.restaurantItemList;
     for(let i=0;i<restaurantItemList.length;i++){
          if(restaurantItemList[i].count>0){
           const iprice=restaurantItemList[i].count*restaurantItemList[i].price;
           const obj={nameofitem:restaurantItemList[i].nameofitem,count:restaurantItemList[i].count,price:iprice}
          // List.push(<h3>{restaurantItemList[i].id}</h3>)
           List.push(obj)
          }
      }
      return List.map((menuItem)=> {
        
        return (
        
         <tr>
           <td>{menuItem.nameofitem}</td>
           <td> {menuItem.count}</td>
           <td> {menuItem.price}</td>
         </tr>
           
        );
      });
    }

    handleplace = (event) =>{
       this.props.placeOrder();
       this.props.onRequestClose();
    }

    render(){
        
        console.log(this.props.restaurantItemList)
        return(
         <div>
             <Modal isOpen={this.props.modalIsOpen} 
              >
              <div>
              <table class="table">
               <thead>
               <tr>
               <th scope="col">Items</th>
               <th scope="col">Count</th>
               <th scope="col">Price</th>
               </tr>
               </thead>
               <tbody>
               
                {this.displayResto()}
                
               </tbody>
              </table>
                
                <button type="button" className="btn btn-warning bsize btn-align" onClick={this.handleplace}>Pay</button>
              </div>

             </Modal>
         </div>
        );
    }
}

export default Ordermodel;