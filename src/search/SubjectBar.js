import React, {Component} from 'react';
import DropDown from 'react-bootstrap/Dropdown';
import Subject from "../constants/Subjects.json"
import { DropdownButton } from "react-bootstrap";

class SubjectBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            sel_subj : ""
        }
    }

    handleSelect = e =>{
        this.setState({
            sel_subj:e
        });
        this.props.setSubject(e);
    }
    subjectMenu = () =>{
        const {Subjects} = Subject;
        const {sel_subj} = this.state;
        let title = "";
        if(sel_subj === ""){
            title = "Select department."
        }
        else{
            title = Subjects[sel_subj];
        }
        return(
            <DropdownButton title = {title} onSelect = {this.handleSelect}>
                {
                    Object.keys(Subjects).map((key,index) =>{
                        return(
                            <DropDown.Item key = {index} eventKey = {key}>
                                {Subjects[key]}
                            </DropDown.Item>
                        );
                    })
                }
            </DropdownButton>
        );
    }

    render(){
        return(
            <div>
                Subject
                <this.subjectMenu/>
            </div>
        );
    }
}
export default SubjectBar;
