import React, { Component } from 'react';
import Courses from '../util/Courses';
import Constants from '../constants/BackendEP.json';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { TransverseLoading } from 'react-loadingg';

import '../css/search_result.css';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: false,
      classInfo: null,
      classDescription: null,
      isError: false,
      errorMessage: '',
    };
  }

  componentDidMount() {
    this.getClassInfo();
  }

  getClassInfo = () => {
    const payload = this.props.query;
    Courses.searchCourses(payload)
      .then((response) => {
        const { data } = response;
        const classes = data.classInfo;
        const descriptions = data.classDescription;
        const courseOrder = data.courseOrder;
        if (classes.length !== 0) {
          let map = {};
          let classDescriptionMap = {};
          classes.forEach((item) => {
            if (map[item.name]) {
              map[item.name].push(item);
            } else {
              map[item.name] = [];
              map[item.name].push(item);
            }
          });
          descriptions.forEach((item) => {
            if (!classDescriptionMap[item.course_id]) {
              classDescriptionMap[item.course_id] = item;
            }
          });
          this.setState({
            result: true,
            classDescription: classDescriptionMap,
            classInfo: map,
            courseOrder: courseOrder,
          });
        } else {
          this.setState({
            isError: true,
            errorMessage: 'No courses found.',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isError: true,
          errorMessage: 'Server Error!',
        });
      });
  };

  popover = (className) => {
    const { classDescription } = this.state;
    const course = classDescription[className];
    if (!classDescription[className]) {
      return (
        <Popover id="popover-basic">
          <Popover.Content style={{ color: 'red' }}>
            Could not retrieve course description, sorry.
          </Popover.Content>
        </Popover>
      );
    } else {
      return (
        <Popover id="popover-basic">
          <Popover.Title as="h3">{course.course_id}</Popover.Title>
          <Popover.Content>
            {course.course_title}
            <br></br>
            {course.course_description}
          </Popover.Content>
        </Popover>
      );
    }
  };
  //, overflow:"auto", display:"block",tableLayout: "auto"
  displayClasses = () => {
    const { classInfo, courseOrder } = this.state;
    const rmpURL = Constants.RMP.url;
    return courseOrder.map((className, num) => {
      return (
        <div key={num} className="table-responsive">
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="right"
            overlay={this.popover(className)}
          >
            <Button
              variant="primary"
              size="lg"
              className="btn-description"
              style={{ backgroundColor: '#F17171' }}
            >
              {className}
            </Button>
          </OverlayTrigger>
          <br></br>
          <Table size="sm" key={num}>
            <thead style={{ backgroundColor: 'white' }}>
              <tr>
                <th>Add</th>
                <th>CRN</th>
                <th>Cred</th>
                <th>Instructor</th>
                <th>Times</th>
                <th>Location</th>
                <th>Enrollment</th>
                <th>Status</th>
              </tr>
            </thead>
            {classInfo[className].map((key, index) => {
              const { meetingTimes, location, activated, capacity, status } =
                key;
              const { meetings } = meetingTimes;
              const activatedInt = parseInt(activated, 10);
              const capacityInt = parseInt(capacity, 10);
              let enrollmentFontColor = 'grey';
              let enrollmentStatusColor = 'green';
              let rowColor = 'white';
              if (activatedInt < capacityInt) {
                enrollmentFontColor = 'green';
              } else if (activated >= capacityInt) {
                enrollmentFontColor = 'red';
              }
              if (status === 'Open') {
                enrollmentStatusColor = 'green';
              } else if (status === 'Waitlist Open') {
                enrollmentStatusColor = '#FF7C00'; //orange
              } else {
                enrollmentStatusColor = 'red';
              }
              if (index % 2 === 0) {
                rowColor = '#F7F7F7';
              } else {
                rowColor = 'white';
              }
              let randomNum =
                Math.floor(Math.random() * 1000) + Number.parseInt(index);
              let tableKey = key.CRN + randomNum;
              return (
                <tbody key={tableKey}>
                  <tr
                    style={{
                      backgroundColor: rowColor,
                      fontSize: '14px',
                      fontFamily: 'Roboto',
                    }}
                  >
                    <td>
                      {key.status !== 'Hold' && key.status !== 'Cancelled' ? (
                        <Button
                          size="sm"
                          className="btn-add"
                          onClick={(e) => this.props.pushCourse(e, key)}
                        >
                          +
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled
                          className="btn-disabled"
                          style={{
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            color: 'grey',
                          }}
                        >
                          +
                        </Button>
                      )}
                    </td>
                    <td>{key.CRN}</td>
                    <td>{key.cred}</td>
                    <td>
                      {key.status !== 'Hold' && key.status !== 'Cancelled' ? (
                        <a
                          href={rmpURL + key.instructor}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'purple' }}
                        >
                          {key.instructor}
                        </a>
                      ) : (
                        key.instructor
                      )}
                    </td>
                    <td>
                      {meetings[0].info === 'available'
                        ? meetings[0].days + ' ' + meetings[0].time
                        : meetings[0].description}
                    </td>
                    <td>{location[0]}</td>
                    <td style={{ color: enrollmentFontColor }}>
                      {key.activated + '/' + key.capacity}
                    </td>
                    <td style={{ color: enrollmentStatusColor }}>
                      {key.status}
                    </td>
                  </tr>
                  {meetings.length > 1 &&
                    meetings.map((key, index) => {
                      randomNum = Math.floor(Math.random() * 1000) + index;
                      if (index !== 0) {
                        return (
                          <tr
                            key={key.CRN + randomNum}
                            style={{
                              backgroundColor: rowColor,
                              fontSize: '14px',
                              fontFamily: 'Roboto',
                            }}
                          >
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                              {key.info === 'available'
                                ? key.days + ' ' + key.time
                                : key.description}
                            </td>
                            {location.length > 1 && <td>{location[index]}</td>}
                            <td></td>
                            <td></td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                </tbody>
              );
            })}
          </Table>
        </div>
      );
    });
  };

  render() {
    const { result, isError, errorMessage } = this.state;
    if (result) {
      return (
        <div>
          <this.displayClasses />
        </div>
      );
    } else if (isError) {
      return <div>{errorMessage}</div>;
    } else {
      return (
        <div>
          <TransverseLoading size="large" color="red"></TransverseLoading>
          <div className="loading-text">
            Mt. Sac servers are slow, sorry for the inconvience.
          </div>
        </div>
      );
    }
  }
}
export default SearchResults;
