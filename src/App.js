import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/column.css"
import "./css/nav_bar.css"
import Navbar from "react-bootstrap/Navbar"
import EventMaker from "./util/EventMaker";
import SearchForm from "./search/SearchForm";
import Calendar from "./calender/Calendar"
import Block from "./block/Block";
import LeftNavBar from "./Navbar/LeftNavbar";
import EventColors from "./constants/Colors.json"

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedCourses:{},
      eventList:[],
      isBlockForm: false,
      showPopover: false,
      height:0
    }
  }


  componentDidMount() {
    this.updateHeight();
    window.addEventListener('resize', this.updateHeight);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight);
  }
  updateHeight = () =>{
      this.setState({height: window.innerHeight})
  }
  /*
  shouldComponentUpdate(nextProps, nextState){
    const prevSelectedCourses = this.state.selectedCourses;
    const nextSelectedCourses = nextState.selectedCourses;
    return Object.keys(prevSelectedCourses).length !== Object.keys(nextSelectedCourses);
  }
  */

  changeBlock = (e, input) =>{
    this.setState({isBlockForm:input})
  }

  pushCourse = (e,course) =>{
    let {colorList} = EventColors;
    let {selectedCourses, eventList} = this.state;
    if(!selectedCourses[course.CRN]){
      let events = EventMaker.parseTime(course);
      let courseInfo = {
        name:course.name,
        instructor:course.instructor,
        meetingTimes:course.meetingTimes,
        location:course.location,
        cred:course.cred
      };
      if(Object.keys(courseInfo).length >= 20){
        courseInfo.color = "4363d8"
      }
      else{
        courseInfo.color = colorList[Object.keys(selectedCourses).length];
      }
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
    let updatedEventList = EventMaker.removeEvents(eventList, CRN);
    this.setState({
      selectedCourses: selectedCourses,
      eventList: updatedEventList
    });
  }

  loadCourse = (selectedCourses, eventList) =>{
    this.setState({
      selectedCourses:selectedCourses,
      eventList:eventList
    });
  }


  render(){
    const {isBlockForm,selectedCourses, eventList, height} = this.state;
    const colHeight = String.toString(height - 56) + "vh";
    return ( 
      <div style = {{backgroundColor: "#a9bedf"}}>
        <Navbar sticky = "top" className = "navbar-main">
          <Navbar.Brand style ={{color:"white"}}>
              Mountie Planner
          </Navbar.Brand>
        </Navbar>
        <Container fluid>
          <Row>
            <Col className = "column-scroll px-0" style = {{height:colHeight}}>
              <LeftNavBar 
                loadCourse = {this.loadCourse}
                changeBlock = {this.changeBlock} 
                selectedCourses = {selectedCourses}
                eventList = {eventList}
              >
              </LeftNavBar>
              {isBlockForm ?  <Block selectedCourses = {this.state.selectedCourses} deleteCourse = {this.deleteCourse}></Block> :
                <Calendar eventList = {this.state.eventList} selectedCourses = {this.state.selectedCourses} deleteCourse = {this.deleteCourse}/>
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
