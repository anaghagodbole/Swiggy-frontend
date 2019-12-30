import React,{Component} from 'react';
import Modal from 'react-modal';
import './RestoModal.css';
import Restaurantitem from './Restaurantitem';

class ItemModal extends Component{

    constructor(props){
       super(props)
       this.state={
           item:"",
           price:""
       }
    }

    handleItem = (event) =>{
        this.setState({item:event.target.value})
    }

    handlePrice =(event) =>{
        this.setState({price:event.target.value})
    }

    clear = () => {
        this.setState({item: ""})
        this.setState({price:""})
    }

    handleSubmit =()=>{

    this.props.submitData(this.state.item,this.state.price)
    this.clear();
    this.props.onRequestClose()
       
    }

    render(){

        return(
            <div>
            <Modal isOpen={this.props.modalIsOpen} >
            <div className="text-align">
              <div className="form-group width">
              <h3><label>Item</label></h3>
              <input type="Restoname" name="name"  id="Restoname" className="form-control" value={this.state.item}  onChange={this.handleItem} />
              </div>
              <div className="form-group width">
              <h3> <label>Price</label></h3>
              <input type="Restoaddr" name="address" className="form-control" id="Restoaddr" value={this.state.price} onChange={this.handlePrice}/>
              </div>
              <button className="btn btn-dark text-header" onClick={this.handleSubmit}>Add Item</button>
          </div>
            
            </Modal>
            </div>

        );
    }


}

export default ItemModal;