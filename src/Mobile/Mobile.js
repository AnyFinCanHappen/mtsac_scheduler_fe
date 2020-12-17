import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Info from "../info/Info";
import Calendar from "../calender/Calendar";
import Block from "../block/Block";
import LeftNavBar from "../Navbar/LeftNavbar";
import SearchForm from "../search/SearchForm";

class Mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCalendar: false,
        };
    }
    render() {
        const {
            showInfoPage,
            colHeight,
            loadCourse,
            changeBlock,
            selectedCourses,
            eventList,
            pushCustomEvent,
            isBlockForm,
            deleteCourse,
            changeCourseColor,
        } = this.props;
        const { isCalendar } = this.state;
        return (
            <Container fluid>
                {showInfoPage ? (
                    <Info colHeight={colHeight}></Info>
                ) : (
                    <Row>
                        {isCalendar ? (
                            <Col
                                Col
                                className="px-0"
                                style={{ overflowY: "auto", height: colHeight }}
                            >
                                <LeftNavBar
                                    loadCourse={loadCourse}
                                    changeBlock={changeBlock}
                                    selectedCourses={selectedCourses}
                                    eventList={eventList}
                                    pushCustomEvent={pushCustomEvent}
                                ></LeftNavBar>
                                {isBlockForm ? (
                                    <Block
                                        selectedCourses={selectedCourses}
                                        deleteCourse={deleteCourse}
                                    ></Block>
                                ) : (
                                    <Calendar
                                        eventList={eventList}
                                        selectedCourses={selectedCourses}
                                        deleteCourse={deleteCourse}
                                        changeCourseColor={changeCourseColor}
                                    />
                                )}
                            </Col>
                        ) : (
                            <Col
                                style={{ overflowY: "auto", height: colHeight }}
                            >
                                <SearchForm pushCourse={this.pushCourse} />
                            </Col>
                        )}
                    </Row>
                )}
            </Container>
        );
    }
}
export default Mobile;
