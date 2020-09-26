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
            isError:false,
            resultCode:null,
            target:null,
            username:"",
            errorMessage:"",
            isSaveLocal:true
        }
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
    handleRadioChange = () =>{
        const {isSaveLocal} = this.state;
        this.setState({
            isSaveLocal:!isSaveLocal
        });
    }

    saveCourse = () =>{
        const {selectedCourses, eventList} = this.props;
        const {username} = this.state;
        const noSpace = username.replace(/\s/g, '');
        if(username !== "" && noSpace.length > 0){
            const payload = {
            selectedCourses: selectedCourses,
            eventList: eventList,
            username: username
            };
            this.setState({isSaving:true});
            Courses.saveCourses(payload)
            .then(response =>{
                //console.log(response);
                if(response.data.resultCode === classSuccessCode){
                    this.setState({
                        isSaving:false,
                        resultCode:response.data.resultCode
                    })
                }
                else{
                    this.setState({
                        isSaving:false,
                        resultCode:response.data.resultCode,
                        isError:false,
                        errorMessage: response.data.message
                    })
                }
            })
            .catch(err =>{
                this.setState({
                    isSavign:false,
                    resultCode:404,
                    isError:true,
                    errorMessage:"Server Error."
                })
            });      
        }
        else{
            this.setState({
                isError:true,
                errorMessage:"Please enter a username."
            })
        }
    }

    saveCourseLocally = () =>{
        const {selectedCourses, eventList} = this.props;
        const {username} = this.state;
        const noSpace = username.replace(/\s/g, '');
        if(username !== "" && noSpace.length > 0){
            const payload = {
                selectedCourses: selectedCourses,
                eventList: eventList,
                username: username
            };
            localStorage.setItem(username,JSON.stringify(payload));
            this.setState({
                isError:false,
                isSaving:false,
                resultCode:classSuccessCode
            });
        }
        else{
            this.setState({
                isError:true,
                errorMessage:"Please enter a username."
            });
        }       
    }

    render(){
        const {showPopover, target, isSaving, resultCode,isError, errorMessage,isSaveLocal} = this.state;
        var saveFunction;
        if(isSaveLocal){
            saveFunction = this.saveCourseLocally;
        }
        else{
            saveFunction = this.saveCourse;
        }
        return(
            <Overlay 
            show = {showPopover} 
            target = {target} 
            placement = "bottom" 
            rootClose = {true}
            onHide = {() => {this.setState({showPopover:false, isSaving:false, resultCode:null, isError:false, errorMessage:""})}} 
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
                    <div>
                        <br></br>
                        <input type = "checkbox" checked = {isSaveLocal === true} onClick = {this.handleRadioChange} onChange = {()=>{}}/>{" Save Locally(uncheck for shared devices)"}
                    </div>
                    {isError &&
                    <Form.Text style = {{color:"red"}}>
                        {errorMessage}
                    </Form.Text>}
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
                    <Button onClick = {saveFunction}>Save</Button>
                </Form>
                </Popover.Content> 
            </Popover>
            </Overlay>
        );        
    }
}
export default SaveCourseOverlay