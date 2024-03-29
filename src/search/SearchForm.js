import React, { Component } from 'react';
import TermBar from './TermBar';
import SubjectBar from './SubjectBar';
import Terms from '../constants/Terms.json';
import SearchResults from './SearchResults';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../css/nav_bar.css';

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
        "sel_attr": [ "%25", "%25" ],       //push into array for special type of class section 
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
        "line": "N",  use "D"
        "nco": "N",
        "crsz": "%25"
    }
*/

const defaultQuery = {
  TERM: Terms.Term.Spring2022,
  TERM_DESC: Terms.TermDesc[Terms.Term.Spring2022],
  sel_subj: ['dummy'],
  //Below fields cannot be modified by the user.
  sel_day: 'dummy',
  sel_schd: 'dummy',
  sel_camp: ['dummy', 'MS'],
  sel_ism: 'dummy',
  sel_sess: 'dummy',
  sel_instr: ['dummy', '%25'],
  sel_ptrm: ['dummy', '%25'],
  sel_attr: ['%25', '%25'],
  sel_crse: '',
  sel_crn: '',
  sel_title: '',
  begin_hh: '5',
  begin_mi: '0',
  begin_ap: 'a',
  end_hh: '11',
  end_mi: '0',
  end_ap: 'p',
  month: '%25',
  aa: 'N',
  pr: 'N',
  tod: 'A',
  line: 'A',
  nco: 'N',
  crsz: '%25',
};

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: defaultQuery,
      isSearch: false,
      isError: false,
      subjectTitle: '',
      errorMessage: '',
    };
  }

  setTerm = (TermID) => {
    const { TermDesc } = Terms;
    const term_desc = String(TermDesc[TermID]).replace(' ', '+');
    this.setState({
      query: {
        ...this.state.query,
        TERM: TermID,
        TERM_DESC: term_desc,
      },
    });
  };

  setSubjectTitle = (title) => {
    if (title !== null) {
      this.setState({
        isError: false,
        errorMessage: '',
      });
    }
    this.setState({
      subjectTitle: title,
    });
  };

  setSubject = (subjID) => {
    const subjectArray = this.state.query.sel_subj;
    if (subjectArray.length === 1) {
      if (subjID !== 'all') {
        subjectArray.push(subjID);
        this.setState({
          query: {
            ...this.state.query,
            sel_subj: subjectArray,
          },
        });
      }
    } else {
      if (subjID !== 'all') {
        subjectArray[1] = subjID;
        this.setState({
          query: {
            ...this.state.query,
            sel_subj: subjectArray,
          },
        });
      } else {
        const allCourse = subjectArray.splice(0, 1);
        this.setState({
          query: {
            ...this.state.query,
            sel_subj: allCourse,
          },
        });
      }
    }
  };

  handleClick = () => {
    const { subjectTitle } = this.state;
    if (subjectTitle !== '') {
      this.setState({
        isSearch: true,
      });
    } else {
      this.setState({
        isError: true,
        errorMessage: 'Please select a subject.',
      });
    }
  };

  resetSearchQuery = () => {
    this.setState({
      isSearch: false,
      subjectTitle: '',
      query: {
        ...defaultQuery,
        sel_subj: ['dummy'],
      },
    });
  };
  render() {
    const { isSearch, query, isError, errorMessage, subjectTitle } = this.state;
    return (
      <div>
        <Navbar variant="nav-link" sticky="top" className="navbar-color">
          <Nav className="m-auto">
            <Nav.Item>
              <Nav.Link onClick={this.resetSearchQuery}>Search</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
        {!isSearch ? (
          <div>
            <TermBar setTerm={this.setTerm} termID={query.TERM} />
            <SubjectBar
              setSubject={this.setSubject}
              setSubjectTitle={this.setSubjectTitle}
              subjectTitle={subjectTitle}
            />
            {isError && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <br></br>
            <button onClick={this.handleClick}>Search</button>
          </div>
        ) : (
          <div>
            <SearchResults query={query} />
          </div>
        )}
      </div>
    );
  }
}

export default SearchForm;
