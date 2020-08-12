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
            username:"",
            showPopover:false,
            isLoading:false,
            resultCode:null,
            target:null,
            isError:false,
            errorMessage:""
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
        const noSpace = username.replace(/\s/g, '');
        if(username !== "" && noSpace.length > 0){
            const payload = {username:username}
            this.setState({isLoading:true});   
            Courses.loadCourses(payload)
            .then(response =>{
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
                        isLoading:false,
                        resultCode:response.data.resultCode,
                        isError:true,
                        errorMessage:response.data.message
                    })
                }
            })
            .catch(err =>{
                this.setState({
                    isLoading:false,
                    resultCode:404,
                    isError:true,
                    errorMessage:"Server Error."
                })
            })          
        }
        else{
            this.setState({
                isError:true,
                errorMessage:"Please enter a username."
            })
        }
    }

    render(){
        const {showPopover, target, isLoading, resultCode, isError, errorMessage} = this.state;
        return(
            <Overlay 
            show = {showPopover} 
            target = {target} 
            placement = "bottom" 
            rootClose = {true}
            onHide = {() => {this.setState({showPopover:false, isLoading:false, resultCode:null, isError:false, errorMessage:""})}} 
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
                    {isError &&
                    <Form.Text style = {{color:"red"}}>
                        {errorMessage}
                    </Form.Text>}
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