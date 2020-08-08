import React, {Component} from "react";
import DropDown from 'react-bootstrap/Dropdown';
import Terms from "../constants/Terms.json"
import "../css/search_form.css"

class TermBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            Term:"202020"
        }
    }

    keysIntoList = () =>{
        const {TermDesc} = Terms;
        let list = [];
        Object.keys(TermDesc).sort().reverse().forEach(key =>{
            list.push(key);
        });
        return list;
    }


    handleSelect = e =>{
        this.setState({Term: e})
        this.props.setTerm(e);
    }

    termMenu = () => {
        const {TermDesc} = Terms;
        const keyList = this.keysIntoList();
        const {Term} = this.state;
        return(
            <DropDown onSelect = {this.handleSelect}>
                <DropDown.Toggle  className = "dropdown-search" style = {{backgroundColor: "white", color:"black"}}>
                    {TermDesc[Term]}
                </DropDown.Toggle>
                <DropDown.Menu>
                    {
                        keyList.map((key,index) => {
                                return(
                                    <DropDown.Item  key = {index} eventKey = {key}>{TermDesc[key]}</DropDown.Item>
                                );
                        })
                    }                    
                </DropDown.Menu>
            </DropDown>
        );
    }

    render(){
        return(
            <div>
                Term
                <this.termMenu/>
            </div>
        );
    }
}

export default TermBar;