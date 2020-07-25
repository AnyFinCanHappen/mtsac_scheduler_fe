import React, {Component} from 'react';
import TermBar from "./TermBar";
import SubjectBar from "./SubjectBar";
import Terms from "../constants/Terms.json";
import SearchResults from "./SearchResults";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../css/nav_bar.css"




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
            query : {
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
            },
            isSearch:false
        }
    }



    setTerm = (TermID) =>{
        const {TermDesc} = Terms;
        const term_desc = String(TermDesc[TermID]).replace(" ", "+");
        this.setState({
            query: {
            ...this.state.query,
            TERM:TermID,
            TERM_DESC:term_desc
        }});
    }

    setSubject = (subjID) =>{
        const subjectArray = this.state.query.sel_subj;
        if(subjectArray.length === 1){
            if(subjID !== "all"){
                subjectArray.push(subjID);
                this.setState({
                    query:{
                    ...this.state.query,
                    sel_subj:subjectArray
                }})
            }
        }
        else{
            if(subjID !== "all"){
                subjectArray[1] = subjID;
                this.setState({
                    query:{
                    ...this.state.query,
                    sel_subj:subjectArray
                }});
            }
            else{
                const allCourse = subjectArray.splice(0,1);
                this.setState({
                    query:{
                    ...this.state.query,
                    sel_subj:allCourse
                }});
            }
        }
    }

    handleClick = () =>{
        this.setState({
            isSearch:true
        });
    }

    render(){
        const {isSearch,query} = this.state;
        return(
            <div>
                <Navbar variant="nav-link" bg="dark" sticky = "top">
                    <Nav className='m-auto'>
                        <Nav.Item >
                            <Nav.Link onClick = {() => {this.setState({isSearch:false})}} >
                                Search
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                {!isSearch ? 
                    <div>
                        Search Page
                        <TermBar setTerm = {this.setTerm}/>
                        <SubjectBar setSubject = {this.setSubject}/>
                        <br></br>
                        <button onClick = {this.handleClick}>Search</button> 
                    </div> 
                    :
                    <div>
                        <SearchResults query = {query} pushCourse = {this.props.pushCourse}/>
                    </div>
                }
            </div>
        );

    }
}

export default SearchForm;