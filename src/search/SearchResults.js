import React, {Component} from 'react';
import Courses from "../util/Courses";
import Constants from "../constants/BackendEP.json"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover  from 'react-bootstrap/Popover';
import WebScrape from "../util/WebScrape";

class SearchResults extends Component{
    constructor(props){
        super(props);
        this.state = {
            result:false,
            classInfo:null,
            classDescription:null,
            isError:false,
            errorMessage:""
        }
    }

    componentDidMount(){
        this.getClassInfo();
    }

    getClassInfo = () =>{
        console.log("sending")
        const payload = this.props.query;
        
        /*
        //When front end does websraping
        let query = WebScrape.constructQueryParam(payload);
        WebScrape.parseHTML(query)
        */

        //When backend does webscraping
        Courses.getCourses(payload)        
        .then(response =>{
            
            /*
            //When front end does websraping
            const classes = response.classInfo;
            const descriptions = response.classDescription;
            const courseOrder = response.courseOrder;
            */
            
            //when back end does webscraping (use only for development)
            const classes = response.data.classInfo;
            const descriptions = response.data.classDescription;
            const courseOrder = response.data.courseOrder;
            
            if(classes.length !== 0){
                let map = {}
                let classDescriptionMap = {}
                classes.forEach(item =>{
                    if(map[item.name]){
                        map[item.name].push(item);
                    }
                    else{
                        map[item.name] = [];
                        map[item.name].push(item);
                    }
                });  
                descriptions.forEach(item =>{
                    if(!classDescriptionMap[item.course_id]){
                        classDescriptionMap[item.course_id] = item;
                    }
                })
                this.setState({
                    result:true,
                    classDescription:classDescriptionMap,
                    classInfo:map,
                    courseOrder:courseOrder
                });
                console.log("Got data!");
            }
            else{
                this.setState({
                    isError:true,
                    errorMessage:"No courses found."
                })
            }
        })
        .catch(err =>{
            console.log(err);
            this.setState({
                isError:true,
                errorMessage:"Server Error!"
            })
        });
    }

    popover = (className) =>{
        const {classDescription} = this.state;
        const course = classDescription[className];
        if(!classDescription[className]){
            return(
                <Popover id = "popover-basic">
                    <Popover.Content style ={{color:"red"}}>
                        Could not retrieve course description, sorry.
                    </Popover.Content> 
                </Popover>
            );
        }
        else{
            return(
                <Popover id = "popover-basic">
                    <Popover.Title as = "h3">{course.course_id}</Popover.Title>
                    <Popover.Content>
                        {course.course_title}
                        <br></br> 
                        {course.course_description}
                    </Popover.Content> 
                </Popover>
            );
        }   
    }

    displayClasses = () =>{
        const{classInfo, courseOrder} = this.state;
        const rmpURL = Constants.RMP.url;
        return(
            courseOrder.map((className,num)=>{
                return(
                    <div key = {num}>
                    <OverlayTrigger trigger = "click" rootClose placement = "right" overlay = {this.popover(className)}>     
                        <Button variant = "primary" size = "lg">{className}</Button>
                    </OverlayTrigger>   
                    <Table striped bordered size = "sm" key = {num}>
                        <thead>
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
                        {classInfo[className].map((key, index) =>{
                            const {meetingTimes, location, activated, capacity, status} = key;
                            const {meetings} = meetingTimes;
                            const activatedInt = parseInt(activated,10);
                            const capacityInt = parseInt(capacity,10);
                            let enrollmentFontColor = "grey";
                            if(activatedInt < capacityInt){
                                enrollmentFontColor = "green";
                            }
                            else if (activated >= capacityInt){
                                enrollmentFontColor = "red";
                            }
                            let enrollmentStatusColor = "green";
                            if(status === "Open"){
                                enrollmentStatusColor = "green";
                            }
                            else if(status === "Waitlist Open"){
                                enrollmentStatusColor = "#FF7C00"; //orange
                            }
                            else{
                                enrollmentStatusColor = "red";
                            }
                            return(
                                <tbody key = {key.crn + ":" + index}>
                                    <tr>
                                        <td>
                                            {
                                                key.status !== "Hold" && key.status !== "Cancelled" ?
                                                <Button size = "sm" onClick = {(e) => this.props.pushCourse(e,key)}>+</Button> :
                                                "+"
                                            }
                                        </td>
                                        <td>{key.CRN}</td>
                                        <td>{key.cred}</td>
                                        <td>
                                            {key.status !== "Hold" && key.status !== "Cancelled" &&
                                                <a href = {rmpURL + key.instructor} target="_blank" rel="noopener noreferrer">
                                                    {key.instructor}
                                                </a>
                                            }
                                        </td>
                                        <td>
                                            {
                                                meetings[0].info === "available" ? 
                                                meetings[0].days + " " + meetings[0].time :
                                                meetings[0].description
                                            }
                                        </td>
                                        <td>{location[0]}</td>
                                        <td style = {{color:enrollmentFontColor}}>{key.activated + "/" + key.capacity}</td>
                                        <td style = {{color:enrollmentStatusColor}}>{key.status}</td>
                                    </tr>
                                    {meetings.length > 1 && meetings.map((key,index) => {
                                        if(index !== 0){
                                            return(
                                                <tr key = {key}>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
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
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            );
                                        }
                                        else{
                                            return null;
                                        }
                                    })}
                                </tbody>
                            );
                        })}
                    </Table>
                    </div>
                );
            })
        );
    }

    render(){
        const {result, isError,errorMessage} = this.state;
        if(result){
            return(
                <div>
                    <this.displayClasses/>
                </div>

            );
        }
        else if(isError){
            return(
                <div>
                    {errorMessage}
                </div>
            )
        }
        else{
            return(
                <div>
                    loading
                </div>
            );
        }
    }
}
export default SearchResults;