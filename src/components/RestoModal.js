import React,{Component} from 'react';
import Modal from 'react-modal';
import './RestoModal.css';
import Listresto from './Listresto';

class RestoModal extends Component{
  

    constructor(props){
        super(props);
        this.state = {
          rname : "",
          raddress : "",
         }
    }

    handleRestoname =(event)=>{
        this.setState({rname:event.target.value});
    }

    handleRestoaddr =(event)=>{
        this.setState({raddress:event.target.value});
    }

    clear = () =>{

        this.setState({rname:""})
        this.setState({raddress :""})
        // this.state.rname=null;
    //    this.state.raddress=null;
    }

    handleSubmit = (event) =>{
        // event.stopPropagation();
       this.props.submitData(this.state.rname,this.state.raddress)
       this.clear()
       this.props.onRequestClose()

    }

    render(){
        console.log(this.state.rname)
        console.log(this.state.raddress)
       return (
           <div>
            <Modal
            isOpen={this.props.modalIsOpen} >
           
           <div className="text-align">
              <div className="form-group width">
              <h3><label>Restaurant Name</label></h3>
              <input type="Restoname" name="name"  id="Restoname" className="form-control" value={this.state.rname}  onChange={this.handleRestoname} />
              </div>
              <div className="form-group width">
              <h3> <label>Restaurant Adress</label></h3>
              <input type="Restoaddr" name="address" className="form-control" id="Restoaddr" value={this.state.raddress} onChange={this.handleRestoaddr}/>
              </div>
              <button className="btn btn-dark text-header" onClick={this.handleSubmit}>Add Restaurant</button>
          </div>
            </Modal>
           </div>

        );
    }
}

export default RestoModal;
