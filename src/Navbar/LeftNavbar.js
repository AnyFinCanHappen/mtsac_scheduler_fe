import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LoadCourseOverlay from "./LoadCourseOverlay"
import SaveCourseOverlay from "./SaveCourseOverlay"
import "../css/nav_bar.css"


class LeftNavbar extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
        this.changeLoadOverlay = React.createRef();
        this.changeSaveOverlay = React.createRef();
    }

 
    render(){
        const courseCount = Object.keys(this.props.selectedCourses).length;
        return(
            <>
            <Navbar variant="nav-link"  sticky = "top" className = "navbar-color">
                <Nav className='m-auto'>
                <Nav.Link onClick = {(e) => {this.props.changeBlock(e,false)}} >
                    Calendar
                </Nav.Link>
                <Nav.Link onClick = {(e) => {this.props.changeBlock(e,true)}} >
                    Added Classes
                    {courseCount > 0 &&
                    <>
                        <span>
                            {" "}
                        </span>
                        <span className = "course-count">
                            {courseCount}
                        </span>
                    </>
                    }
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
            </>
        );
    }
}

export default LeftNavbar;