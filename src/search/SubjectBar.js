import React, { Component } from 'react';
import DropDown from 'react-bootstrap/Dropdown';
import Subject from '../constants/Subjects.json';
import '../css/search_form.css';

class SubjectBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sel_subj: this.props.subjectTitle,
    };
  }

  handleSelect = (e) => {
    if (e === null) {
      this.setState({
        sel_subj: '',
      });
      this.props.setSubjectTitle('');
    } else {
      this.setState({
        sel_subj: e,
      });
      this.props.setSubject(e);
      this.props.setSubjectTitle(e);
    }
  };
  subjectMenu = () => {
    const { Subjects } = Subject;
    const sel_subj = this.props.subjectTitle;
    let title = '';
    if (sel_subj === '') {
      title = 'Select Department.';
    } else if (sel_subj === 'all') {
      title = 'All Departments';
    } else {
      title = Subjects[sel_subj];
    }
    return (
      <DropDown onSelect={this.handleSelect}>
        <DropDown.Toggle
          className="dropdown-search"
          style={{ backgroundColor: 'white', color: 'black' }}
        >
          {title}
        </DropDown.Toggle>
        <DropDown.Menu className="dropdown-menu-search">
          <DropDown.Item key={-2} eventKey={''}>
            Select Department
          </DropDown.Item>
          <DropDown.Item key={-1} eventKey="all">
            All Departments
          </DropDown.Item>
          {Object.keys(Subjects).map((key, index) => {
            return (
              <DropDown.Item key={index} eventKey={key}>
                {Subjects[key]}
              </DropDown.Item>
            );
          })}
        </DropDown.Menu>
      </DropDown>
    );
  };

  render() {
    return (
      <div>
        Subject
        <this.subjectMenu />
      </div>
    );
  }
}
export default SubjectBar;
