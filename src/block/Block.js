import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


class Block extends Component{
    state = {}

    displayMeetingTimes = (props) =>{
        const {meetings, location} = props;
        return(
            <Table striped bordered size = "sm" >
                <thead>
                    <tr>
                        <th>Times</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>
                    {
                        meetings[0].info === "available" ? 
                        meetings[0].days + " " + meetings[0].time :
                        meetings[0].description
                    }
                    </td>
                    <td>{location[0]}</td>
                    </tr>
                    {meetings.length > 1 && meetings.map((key,index)=>{
                        if(index !== 0){
                            return(
                                <tr key = {index}>
                                    <td>
                                        {
                                            key.info === "available" ?
                                            key.days + " " + key.time :
                                            key.description
                                        }
                                    </td>
                                    {location.length > 1 &&
                                        <td>{location[index]}</td>
                                    }
                                </tr>
                            );
                        }
                        else{
                            return null;
                        }
                    })} 
                </tbody>
            </Table>
        );

    }

    displayCards = () =>{
        const {selectedCourses} = this.props;
        return(
            <CardDeck >
                <Container fluid>
                <Row xs = {1} lg = {3}>
                {Object.keys(selectedCourses).map((item,index) =>{
                    const course = selectedCourses[item];
                    const {meetingTimes, location} = course;
                    const {meetings} = meetingTimes;
                    return(
                        <Col key = {item + ":" + index} style={{padding: '5px'}}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    {course.name}
                                    <Button size = "sm" onClick = {(e) => this.props.deleteCourse(e, item)}>X</Button>
                                </Card.Title>
                                <Card.Text>
                                    {"CRN: " + item}
                                    {"Instructor: " + course.instructor}
                                </Card.Text>
                                <this.displayMeetingTimes meetings = {meetings} location = {location}/>
                            </Card.Body>
                        </Card>
                        </Col>
                    );
                })}
                </Row>
                </Container>
            </CardDeck>
        );
    }

    render(){
        return(
            <div>
                <this.displayCards></this.displayCards>
            </div>
        );
    }
}
export default Block