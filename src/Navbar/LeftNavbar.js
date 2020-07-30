import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Overlay from 'react-bootstrap/Overlay'
import Popover  from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

class LeftNavbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            showPopover: false,
            isSaving:false,
            saveSuccessful:false,
            target:null,
            username:""
        }
    }

    changeSaveSuccessful = (input) =>{
        this.setState({saveSuccessful:input})
    }

    changeIsSaving = (input) =>{
        this.setState({isSaving:input})
    }

    handleChange = (event) =>{
        const {value} = event.target;
        this.setState({
            username:value
        })
    }
    handleSaveButton = (e) =>{
        const {showPopover} = this.state;
        const {target} = e;
        this.setState({
            target: target,
            showPopover:!showPopover
        });
    }
    getUsername = () =>{
        const {showPopover, target, isSaving, saveSuccessful,username} = this.state;
        return(
            <Overlay 
            show = {showPopover} 
            target = {target} 
            placement = "bottom" 
            rootClose = {true}
            onHide = {() => {this.setState({showPopover:false, isSaving:false, saveSuccessful:false})}} 
            >
            <Popover id = "popover-basic">
                <Popover.Title as = "h3">Save</Popover.Title>
                <Popover.Content>
                <Form >
                    <Form.Group controlId = "getUsername" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        placeholder="Enter username"
                        onChange = {this.handleChange}
                    />
                    <Form.Text className="text-muted">
                        Recommend using email's username
                        <br></br>
                        i.e mountie@student.mtsac.edu
                        <br></br>
                        use "mountie"
                    </Form.Text>

                    {isSaving &&
                        <Form.Text>
                        Saving
                        </Form.Text> 
                    }
                    {!isSaving && saveSuccessful &&
                        <Form.Text>
                        Save successful
                        </Form.Text> 
                    }
                    </Form.Group>
                    <Button onClick = {(e)=>{this.props.saveCourse(e, username)}}>Save</Button>
                </Form>
                </Popover.Content> 
            </Popover>
            </Overlay>
        );
    }    
    render(){
        return(
            <div>
                <Navbar variant="nav-link" bg="dark" sticky = "top">
                    <Nav className='m-auto'>
                    <Nav.Link onClick = {(e) => {this.props.changeBlock(e,false)}} >
                        Calendar Form
                    </Nav.Link>
                    <Nav.Link onClick = {(e) => {this.props.changeBlock(e,true)}} >
                        Block Form
                    </Nav.Link>  
                        <Nav.Link onClick = {this.handleSaveButton}>
                            Save
                        </Nav.Link>
                    </Nav>
                </Navbar>
            <this.getUsername></this.getUsername>
          </div>
        );
    }
}

export default LeftNavbar;