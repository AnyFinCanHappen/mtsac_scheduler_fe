import React, {Component} from 'react';
import TermBar from "./TermBar";
import SubjectBar from "./SubjectBar";
import Terms from "../constants/Terms.json"
import Courses from "../util/Courses"

/*
    Mt. Sac search queries has these paremeters
    {
        "TERM": "202020",
        "cred": "",
        "TERM_DESC": "Fall+2020",
        "sel_subj": [ "dummy", "CSCI" ],
        "sel_day": "dummy",
        "sel_schd": "dummy",
        "sel_camp": [ "dummy", "MS" ],
        "sel_ism": "dummy",
        "sel_sess": "dummy",
        "sel_instr": [ "dummy", "%25" ],
        "sel_ptrm": [ "dummy", "%25" ],
        "sel_attr": [ "%25", "%25" ],
        "sel_crse": "",
        "sel_crn": "",
        "sel_title": "",
        "begin_hh": "5",
        "begin_mi": "0",
        "begin_ap": "a",
        "end_hh": "11",
        "end_mi": "0",
        "end_ap": "p",
        "month": "%25",
        "aa": "N",
        "pr": "N",
        "tod": "A",
        "line": "N",
        "nco": "N",
        "crsz": "%25"
    }
*/

class SearchForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            TERM:"202020",
            TERM_DESC: "Fall+2020",
            sel_subj: ["dummy"],
            //Below fields cannot be modified by the user.
            sel_day: "dummy",
            sel_schd: "dummy",
            sel_camp: [ "dummy", "MS" ],
            sel_ism: "dummy",
            sel_sess: "dummy",
            sel_instr: [ "dummy", "%25" ],
            sel_ptrm: [ "dummy", "%25" ],
            sel_attr: [ "%25", "%25" ],
            sel_crse: "",
            sel_crn: "",
            sel_title: "",
            begin_hh: "5",
            begin_mi: "0",
            begin_ap: "a",
            end_hh: "11",
            end_mi: "0",
            end_ap: "p",
            month: "%25",
            aa: "N",
            pr: "N",
            tod: "A",
            line: "N",
            nco: "N",
            crsz: "%25"
        }
    }

    setTerm = (TermID) =>{
        const {TermDesc} = Terms;
        const term_desc = String(TermDesc[TermID]).replace(" ", "+");
        this.setState({
            TERM:TermID,
            TERM_DESC:term_desc
        });
    }

    setSubject = (subjID) =>{
        const subjectArray = this.state.sel_subj;
        if(subjectArray.length === 1){
            this.setState(prevState =>({
                sel_subj:[...prevState.sel_subj, subjID]
            }));
        }
        else{
            subjectArray[1] = subjID;
            this.setState({
                sel_subj:subjectArray
            });
        }
    }

    handleSubmit = () =>{
        console.log("sending")
        const payload = this.state;
        Courses.getClasses(payload)
        .then(response =>{
            console.log(response);
        })
        .catch(err =>{
            console.log(err);
        });
    }

    render(){
        return(
            <div>
                Search Page
                <TermBar setTerm = {this.setTerm}/>
                <SubjectBar setSubject = {this.setSubject}/>
                <button onClick = {this.handleSubmit}>Search</button>
            </div>
        );
    }
}

export default SearchForm;