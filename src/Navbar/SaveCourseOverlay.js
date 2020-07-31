import React, {Component} from 'react';
import Overlay from 'react-bootstrap/Overlay'
import Popover  from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Courses from "../util/Courses";

const classSuccessCode = 300;

class SaveCourseOverlay extends Component{
    constructor(props){
        super(props);
        this.state = {
            showPopover: false,
            isSaving:false,
            resultCode:null,
            target:null,
            username:""
        }
        this.changeLoadOverlay = React.createRef();
    }
    handleChange = (event) =>{
        const {value} = event.target;
        this.setState({
            username:value
        })
    }
    handleSaveLink = (e) =>{
        const {showPopover} = this.state;
        const {target} = e;
        this.setState({
            target: target,
            showPopover:!showPopover
        });
    }


    saveCourse = () =>{
        const {selectedCourses, eventList} = this.props;
        const {username} = this.state;
        if(username !== ""){
            const payload = {
            selectedCourses: selectedCourses,
            eventList: eventList,
            username: username
            };
            this.setState({isSaving:true});
            Courses.saveCourses(payload)
            .then(response =>{
                console.log(response);
                if(response.data.resultCode === classSuccessCode){
                    this.setState({
                        isSaving:false,
                        resultCode:response.data.resultCode
                    })
                }
                else{
                    this.setState({
                        isSavign:false,
                        resultCode:response.data.resultCode
                    })
                }
            });
        }
    }

    render(){
        const {showPopover, target, isSaving, resultCode} = this.state;
        return(
            <Overlay 
            show = {showPopover} 
            target = {target} 
            placement = "bottom" 
            rootClose = {true}
            onHide = {() => {this.setState({showPopover:false, isSaving:false, resultCode:null})}} 
            >
            <Popover id = "popover-basic">
                <Popover.Title as = "h3">Save</Popover.Title>
                <Popover.Content>
                <Form >
                    <Form.Group controlId = "getUsername" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        placeholder="Enter username"
                        onChange = {this.handleChange}
                    />
                    <Form.Text className="text-muted">
                        Recommend using email's username
                        <br></br>
                        i.e mountie@student.mtsac.edu
                        <br></br>
                        use "mountie"
                    </Form.Text>
                    {isSaving &&
                        <Form.Text>
                        Saving
                        </Form.Text> 
                    }
                    {!isSaving && resultCode === classSuccessCode &&
                        <Form.Text>
                        Save successful
                        </Form.Text> 
                    }
                    {!isSaving && resultCode !== null && resultCode !== classSuccessCode &&
                        <Form.Text>
                            Save unsuccessful
                        </Form.Text>
                    }
                    </Form.Group>
                    <Button onClick = {this.saveCourse}>Save</Button>
                </Form>
                </Popover.Content> 
            </Popover>
            </Overlay>
        );        
    }
}
export default SaveCourseOverlay