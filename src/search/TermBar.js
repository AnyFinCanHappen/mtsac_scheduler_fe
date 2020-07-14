import React, {Component} from "react";
import DropDown from 'react-bootstrap/Dropdown';
import Terms from "../constants/Terms.json"
import { DropdownButton } from "react-bootstrap";

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

    dropDownMenu = () => {
        const {TermDesc} = Terms;
        const keyList = this.keysIntoList();
        const {Term} = this.state;
        return(
            <DropdownButton title = {TermDesc[Term]} onSelect = {this.handleSelect}>
                {
                    keyList.map((key,index) => {
                        return(
                            <DropDown.Item  key = {index} eventKey = {key}>{TermDesc[key]}</DropDown.Item>
                        );
                    })
                }
            </DropdownButton>
        );
    }

    render(){
        return(
            <div>
                Term
                <this.dropDownMenu/>
            </div>
        );
    }
}

export default TermBar;