import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Overlay from 'react-bootstrap/Overlay'
import Popover  from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form'

import EventMaker from "./util/EventMaker";
import SearchForm from "./search/SearchForm";
import Calendar from "./calender/Calendar"
import Block from "./block/Block";
import Courses from "./util/Courses";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/column.css"
import { Button } from 'react-bootstrap';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedCourses:{},
      eventList:[],
      username: "",
      isBlockForm: false,
      showPopover: false,
      target:null
    }
  }
  pushCourse = (e,course) =>{
    let {selectedCourses, eventList} = this.state;
    if(!selectedCourses[course.CRN]){
      let events = EventMaker.parseTime(course);
      let courseInfo = {
        name:course.name,
        instructor:course.instructor,
        meetingTimes:course.meetingTimes,
        location:course.location
      };
      events.forEach(event =>{
        eventList.push(event);
      });
      selectedCourses[course.CRN] = courseInfo;
      this.setState({
        selectedCourses: selectedCourses,
        eventList:eventList
      });
    }
  }
  deleteCourse = (e, CRN) =>{
    let {selectedCourses, eventList} = this.state;
    delete selectedCourses[CRN];
    let updatedEventList = EventMaker.removeEvent(eventList, CRN);
    this.setState({
      selectedCourses: selectedCourses,
      eventList: updatedEventList
    });
  }


  saveCourse = (event) =>{
    let {selectedCourses, eventList,username} = this.state;
    console.log(event.target)
    if(username !== ""){
      const payload = {
        selectedCourses: selectedCourses,
        eventList: eventList,
        username: username
      };
      
      Courses.saveClasses(payload)
      .then(response =>{
        console.log(response);
      });
      
    }
  }

  handleChange = (event) =>{
    event.preventDefault();
    this.setState({username:event.target.value});
  }

  handleSaveButton = (e) =>{
    const {showPopover} = this.state;
    this.setState({
      target: e.target,
      showPopover:!showPopover
    });
  }

  getUsername = () =>{
    const {showPopover, target} = this.state;
    return(
      <Overlay 
        show = {showPopover} 
        target = {target} 
        placement = "bottom" 
        rootClose = {true}
        onHide = {() => {this.setState({showPopover:false})}} 
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
              </Form.Group>
              <Button onClick = {this.saveCourse}>Save</Button>
            </Form>
          </Popover.Content> 
        </Popover>
      </Overlay>
    );
  }
  render(){
    const {isBlockForm} = this.state;
    return ( 
      <div>
        <Container fluid>
          <Row>
            <Col className = "column-scroll">
              <Navbar variant="nav-link" bg="dark" sticky = "top">
                <Nav className='m-auto'>
                  <Nav.Link onClick = {() => {this.setState({isBlockForm:false})}} >
                      Calendar Form
                  </Nav.Link>
                  <Nav.Link onClick = {() => {this.setState({isBlockForm:true})}} >
                      Block Form
                  </Nav.Link>  
                    <Nav.Link onClick = {this.handleSaveButton}>
                        Save
                    </Nav.Link>
                </Nav>
              </Navbar>
              <this.getUsername></this.getUsername>
              {isBlockForm ?  <Block selectedCourses = {this.state.selectedCourses} deleteCourse = {this.deleteCourse}></Block> :
                <Calendar eventList = {this.state.eventList} deleteCourse = {this.deleteCourse}/>
              }
            </Col>
            <Col className = "column-scroll">
              <SearchForm pushCourse = {this.pushCourse}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
