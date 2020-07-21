import React, {Component} from 'react';
import SearchForm from "./search/SearchForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "./css/column.css"

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedCourses:{}
    }
  }
  
  pushCourse = (e,course) =>{
    let {selectedCourses} = this.state;
    if(!selectedCourses[course.CRN]){
      const {meetingTimes, location} = course;
      const {meetings} = meetingTimes;
      let courseInfo = {
        meetings:meetings,
        location:location,
        name:course.name
      }
      selectedCourses[course.CRN] = courseInfo
      this.setState({
        selectedCourses: selectedCourses
      })
    }
  }
  render(){
    return ( 
      <div>
        <Container fluid>
          <Row>
            <Col>
              Schedule, implement soon.
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
