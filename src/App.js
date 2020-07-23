import React, {Component} from 'react';
import SearchForm from "./search/SearchForm";
import Calendar from "./calender/Calendar"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "./css/column.css"
import EventMaker from "./util/EventMaker";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedCourses:{},
      eventList:[]
    }
  }
  pushCourse = (e,course) =>{

    let {selectedCourses, eventList} = this.state;
    if(!selectedCourses[course.CRN]){
      let events = EventMaker.parseTime(course);
      let courseInfo = {
        name:course.name
      }
      events.forEach(event =>{
        eventList.push(event);
      })
      selectedCourses[course.CRN] = courseInfo
      this.setState({
        selectedCourses: selectedCourses,
        eventList:eventList
      })
    }
  }
  render(){
    return ( 
      <div>
        <Container fluid>
          <Row>
            <Col className = "column-scroll">
              <Calendar eventList = {this.state.eventList}/>
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
