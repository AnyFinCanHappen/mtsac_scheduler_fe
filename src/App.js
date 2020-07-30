import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/column.css"

import EventMaker from "./util/EventMaker";
import SearchForm from "./search/SearchForm";
import Calendar from "./calender/Calendar"
import Block from "./block/Block";
import LeftNavBar from "./Navbar/LeftNavbar"

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedCourses:{},
      eventList:[],
      isBlockForm: false,
      showPopover: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    const prevSelectedCourses = this.state.selectedCourses;
    const nextSelectedCourses = nextState.selectedCourses;
    return Object.keys(prevSelectedCourses).length !== Object.keys(nextSelectedCourses);
  }

  changeBlock = (e, input) =>{
    this.setState({isBlockForm:input})
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


  render(){
    const {isBlockForm,selectedCourses, eventList} = this.state;
    return ( 
      <div>
        <Container fluid>
          <Row>
            <Col className = "column-scroll">
              <LeftNavBar 
                saveCourse = {this.saveCourse} 
                changeBlock = {this.changeBlock} 
                selectedCourses = {selectedCourses}
                eventList = {eventList}
              >
              </LeftNavBar>
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
