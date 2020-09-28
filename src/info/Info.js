import React, {Component} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../css/info.css"
class Info extends Component{
    state = {}
    
    render(){
        return(
            <Row style = {{backgroundColor:"white"}}>
                <Col></Col>
                <Col style = {{height:this.props.colHeight}} xs = {10}>
                    <div className = "info-title">
                        Info Page
                    </div>
                    <div className = "section-title">
                        New Features
                    </div>
                    <p>
                        -Can save schedules locally.
                        <br></br>
                        -Users can now make custom events.
                        <br></br>
                        -Can now change event colors in calander.
                    </p>
                    <div className = "section-title">
                        Planned Features
                    </div>
                    <p>
                      1) More Search Options
                      <br></br>
                      2) Mobile version (do not go on this website on your phone, save your eyes)
                      <br></br>
                      3) Fix course description format
                      <br></br>
                    </p>
                    <div className = "section-title">
                        About Me and The Mountie Planner.
                    </div>
                    <p>
                        Hey! My name is Sidney Tan, I am UCI graduate who transfered from Mt. Sac. After graduating from UCI, I noticed
                        Mt. Sac did not have a schedule planner. This plus quarantine, I decided to make the planner!
                    </p>
                    <div className = "section-title">
                        Want to Help?
                    </div>
                    <p>
                        If you think the website could use some more improvements or you wanna copy and pasta my code, check out {"the "}
                        <a href = "https://github.com/AnyFinCanHappen/mtsac_scheduler_fe" target="_blank" rel="noopener noreferrer">GitHub</a>
                        {" page!"}
                        <br></br>
                        If there are any questions or issues feel free to email at 
                        <br></br>
                        mountieplanner@gmail.com    
                    </p>
                </Col>
                <Col></Col>
            </Row>
        );
    }
}

export default Info