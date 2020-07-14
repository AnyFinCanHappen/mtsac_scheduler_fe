import React, {Component} from 'react';
import TermBar from "./TermBar";
import Terms from "../constants/Terms.json"


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
            TERM_DESC: "Fall+2020"
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

    render(){
        return(
            <div>
                Search Page
                <TermBar setTerm = {this.setTerm}/>
            </div>
        );
    }
}

export default SearchForm;