import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LoadCourseOverlay from "./LoadCourseOverlay"
import SaveCourseOverlay from "./SaveCourseOverlay"


class LeftNavbar extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
        this.changeLoadOverlay = React.createRef();
        this.changeSaveOverlay = React.createRef();
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
                        <Nav.Link onClick = {(e)=>{this.changeSaveOverlay.current.handleSaveLink(e)}}>
                            Save
                        </Nav.Link>
                        <Nav.Link onClick = {(e) =>{this.changeLoadOverlay.current.handleLoadLink(e)}}>
                            Load
                        </Nav.Link>
                    </Nav>
                </Navbar>
            <SaveCourseOverlay 
                ref = {this.changeSaveOverlay}
                selectedCourses = {this.props.selectedCourses}
                eventList = {this.props.eventList}
            >
            </SaveCourseOverlay>
            <LoadCourseOverlay 
                ref = {this.changeLoadOverlay}
                loadCourse = {this.props.loadCourse}
            >
            </LoadCourseOverlay>
          </div>
        );
    }
}

export default LeftNavbar;