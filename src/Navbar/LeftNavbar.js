import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LoadCourseOverlay from './LoadCourseOverlay';
import SaveCourseOverlay from './SaveCourseOverlay';
import CustomEventOverlay from './CustomEventOverlay';
import store from '../redux/store';
import '../css/nav_bar.css';

class LeftNavbar extends Component {
  subscription;
  constructor(props) {
    super(props);
    this.state = {
      selectedCourses: {},
      eventList: [],
    };
    this.changeLoadOverlay = React.createRef();
    this.changeSaveOverlay = React.createRef();
    this.changeCustomOverlay = React.createRef();
  }

  componentDidMount() {
    this.subscription = store.subscribe(() => {
      const { selectedCourses, eventList } = store.getState().events;
      this.setState({
        selectedCourses,
        eventList,
      });
    });
  }

  componentWillUnmount() {
    this.subscription();
  }
  render() {
    const { selectedCourses, eventList } = this.state;
    let courseCount = 0;
    Object.keys(selectedCourses).map((key) => {
      if (!selectedCourses[key].isCustom) {
        courseCount++;
      }
      return null;
    });
    return (
      <>
        <Navbar variant="nav-link" sticky="top" className="navbar-color">
          <Nav className="m-auto">
            <Nav.Link
              onClick={(e) => {
                this.props.changeBlock(e, false);
              }}
            >
              Calendar
            </Nav.Link>
            <Nav.Link
              onClick={(e) => {
                this.props.changeBlock(e, true);
              }}
            >
              Added Classes
              {courseCount > 0 && (
                <>
                  <span> </span>
                  <span className="course-count">{courseCount}</span>
                </>
              )}
            </Nav.Link>
            <Nav.Link
              onClick={(e) => {
                this.changeSaveOverlay.current.handleSaveLink(e);
              }}
            >
              Save
            </Nav.Link>
            <Nav.Link
              onClick={(e) => {
                this.changeLoadOverlay.current.handleLoadLink(e);
              }}
            >
              Load
            </Nav.Link>
            <Nav.Link
              onClick={(e) => {
                this.changeCustomOverlay.current.handleEventLink(e);
              }}
            >
              Custom
            </Nav.Link>
          </Nav>
        </Navbar>
        <SaveCourseOverlay
          ref={this.changeSaveOverlay}
          selectedCourses={selectedCourses}
          eventList={eventList}
        ></SaveCourseOverlay>
        <LoadCourseOverlay ref={this.changeLoadOverlay}></LoadCourseOverlay>
        <CustomEventOverlay ref={this.changeCustomOverlay}></CustomEventOverlay>
      </>
    );
  }
}

export default LeftNavbar;
