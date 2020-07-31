import React, {Component} from 'react';
import Overlay from 'react-bootstrap/Overlay'
import Popover  from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Courses from "../util/Courses";
import EventMaker from "../util/EventMaker";

const classLoadCode = 320;

class LoadCourseOverlay extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName:"",
            showPopover:false,
            isLoading:false,
            resultCode:null,
            target:null
        }
    }
    handleChange = (event) =>{
        const {value} = event.target;
        this.setState({
            username:value
        })
    }
    handleLoadLink = (e) =>{
        const {showPopover} = this.state;
        const {target} = e;
        this.setState({
            target: target,
            showPopover:!showPopover
        });
    }
    loadCourse = () =>{
        const {username} = this.state;
        if(username !== ""){
            const payload = {username:username}
            this.setState({isLoading:true});   
            Courses.loadCourses(payload)
            .then(response =>{
                console.log(response);
                if(response.data.resultCode === classLoadCode){
                    const {selectedCourses, eventList} = response.data.courses;
                    let updateEventList = EventMaker.convertResponseIntoDate(eventList);
                    this.props.loadCourse(selectedCourses,updateEventList);
                    this.setState({
                        isLoading:false,
                        resultCode:classLoadCode
                    })
                }
                else{
                    this.setState({
                        isSavign:false,
                        resultCode:response.data.resultCode
                    })
                }
            })          
        }
    }

    render(){
        const {showPopover, target, isLoading, resultCode} = this.state;
        return(
            <Overlay 
            show = {showPopover} 
            target = {target} 
            placement = "bottom" 
            rootClose = {true}
            onHide = {() => {this.setState({showPopover:false, isLoading:false, resultCode:null})}} 
            >
            <Popover id = "popover-basic">
                <Popover.Title as = "h3">Load</Popover.Title>
                <Popover.Content>
                <Form >
                    <Form.Group controlId = "getUsername" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        placeholder="Enter username"
                        onChange = {this.handleChange}
                    />
                    {isLoading &&
                        <Form.Text>
                        Loading
                        </Form.Text> 
                    }
                    {!isLoading && resultCode === classLoadCode &&
                        <Form.Text>
                        Load successful
                        </Form.Text> 
                    }
                    {!isLoading && resultCode !== null && resultCode !== classLoadCode &&
                        <Form.Text>
                            Load unsuccessful
                        </Form.Text>
                    }
                    </Form.Group>
                    <Button onClick = {this.loadCourse}>Load</Button>
                </Form>
                </Popover.Content> 
            </Popover>
            </Overlay>
        );
    }
}

export default LoadCourseOverlay;