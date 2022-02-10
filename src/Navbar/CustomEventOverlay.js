import React, { Component } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import store from '../redux/store';
import EventActions from '../redux/eventActions';
import '../css/CustomEvent.css';

function listOfTimeUnits(n) {
  let list = [];
  let i = 1;
  if (n === 59) {
    i = 0;
  }
  for (i; i <= n; i++) {
    if (i < 10) list.push('0' + i);
    else list.push(i);
  }
  return list;
}
const hours = listOfTimeUnits(12);
const minutes = listOfTimeUnits(59);
const midday = ['am', 'pm'];
class CustomEventOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: null,
      showPopover: false,
      isError: false,
      errorMessage: '',
      title: '',
      startHour: '12',
      startMinute: '00',
      startMidday: 'am',
      endHour: '12',
      endMinute: '00',
      endMidday: 'pm',
      isMonday: false,
      isTuesday: false,
      isWednesday: false,
      isThursday: false,
      isFriday: false,
    };
  }
  resetToDefaultState = () => {
    this.setState({
      showPopover: false,
      isError: false,
      errorMessage: '',
      title: '',
      startHour: '12',
      startMinute: '00',
      startMidday: 'am',
      endHour: '12',
      endMinute: '00',
      endMidday: 'pm',
      isMonday: false,
      isTuesday: false,
      isWednesday: false,
      isThursday: false,
      isFriday: false,
    });
  };
  handleEventLink = (e) => {
    const { showPopover } = this.state;
    this.setState({
      target: e.target,
      showPopover: !showPopover,
    });
  };

  handleTitleChange = (e) => {
    const { value } = e.target;
    this.setState({ title: value });
  };

  handleSelect = (e) => {
    const keyVal = e.split(',');
    this.setState({
      [keyVal[0]]: keyVal[1],
    });
  };

  handleRadioChange = (e) => {
    const { target } = e;
    const isDay = this.state[target.value];
    this.setState({
      [target.value]: !isDay,
    });
  };
  handleSubmitButton = () => {
    const {
      title,
      startHour,
      startMinute,
      startMidday,
      endHour,
      endMinute,
      endMidday,
      isMonday,
      isTuesday,
      isWednesday,
      isThursday,
      isFriday,
    } = this.state;
    if (title === '') {
      this.setState({
        isError: true,
        errorMessage: 'Please enter a title.',
      });
    } else if (
      !isMonday &&
      !isTuesday &&
      !isWednesday &&
      !isThursday &&
      !isFriday
    ) {
      this.setState({
        isError: true,
        errorMessage: 'Please select atleast one day.',
      });
    } else {
      let event = {
        title: title,
        startHour: startHour,
        startMinute: startMinute,
        startMidday: startMidday,
        endHour: endHour,
        endMinute: endMinute,
        endMidday: endMidday,
        isMonday: isMonday,
        isTuesday: isTuesday,
        isWednesday: isWednesday,
        isThursday: isThursday,
        isFriday: isFriday,
      };
      store.dispatch(EventActions.pushCustomEventAction(event));
      this.resetToDefaultState();
    }
  };
  timeDropDown = (props) => {
    const { title, unit } = props;
    const display = this.state[title];
    let css = 'dropdown-menu-event';
    let list;
    if (unit === 'hour') {
      list = hours;
    } else if (unit === 'minutes') {
      list = minutes;
    } else {
      list = midday;
      css = 'dropdown-menu-midday';
    }
    return (
      <Dropdown onSelect={this.handleSelect} className="inline">
        <Dropdown.Toggle className="dropdown-event">{display}</Dropdown.Toggle>
        <Dropdown.Menu className={css}>
          {list.map((item, index) => {
            return (
              <Dropdown.Item key={index} eventKey={[title, item]}>
                {item}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  render() {
    const {
      showPopover,
      target,
      isMonday,
      isTuesday,
      isWednesday,
      isThursday,
      isFriday,
      isError,
      errorMessage,
    } = this.state;
    return (
      <Overlay
        show={showPopover}
        target={target}
        placement="bottom"
        rootClose={true}
        onHide={() => {
          this.setState({ showPopover: false });
        }}
      >
        <Popover id="popover-basic">
          <Popover.Title>Custom Event</Popover.Title>
          <Popover.Content>
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder={'Enter Title'}
                  onChange={this.handleTitleChange}
                />
                <div>Start</div>
                <span>
                  <this.timeDropDown
                    title="startHour"
                    unit="hour"
                  ></this.timeDropDown>
                  {' : '}
                  <this.timeDropDown
                    title="startMinute"
                    unit="minutes"
                  ></this.timeDropDown>{' '}
                  <this.timeDropDown
                    title="startMidday"
                    unit="midday"
                  ></this.timeDropDown>
                </span>
                <br></br>
                <div>End</div>
                <span>
                  <this.timeDropDown
                    title="endHour"
                    unit="hour"
                  ></this.timeDropDown>
                  {' : '}
                  <this.timeDropDown
                    title="endMinute"
                    unit="minutes"
                  ></this.timeDropDown>{' '}
                  <this.timeDropDown
                    title="endMidday"
                    unit="midday"
                  ></this.timeDropDown>
                </span>
                <br></br>
                <br></br>
                <div>
                  <input
                    type="checkbox"
                    value="isMonday"
                    checked={isMonday === true}
                    onClick={this.handleRadioChange}
                    onChange={() => {}}
                  />{' '}
                  {' Monday '}
                  <input
                    type="checkbox"
                    value="isTuesday"
                    checked={isTuesday === true}
                    onClick={this.handleRadioChange}
                    onChange={() => {}}
                  />{' '}
                  {' Tuesday '}
                  <input
                    type="checkbox"
                    value="isWednesday"
                    checked={isWednesday === true}
                    onClick={this.handleRadioChange}
                    onChange={() => {}}
                  />{' '}
                  {' Wednesday'}
                  <br></br>
                  <input
                    type="checkbox"
                    value="isThursday"
                    checked={isThursday === true}
                    onClick={this.handleRadioChange}
                    onChange={() => {}}
                  />{' '}
                  {' Thursday '}
                  <input
                    type="checkbox"
                    value="isFriday"
                    checked={isFriday === true}
                    onClick={this.handleRadioChange}
                    onChange={() => {}}
                  />{' '}
                  {' Friday '}
                </div>
                <br></br>
                <Button onClick={this.handleSubmitButton}>Create</Button>
                {isError && (
                  <Form.Text style={{ color: 'red' }}>{errorMessage}</Form.Text>
                )}
              </Form.Group>
            </Form>
          </Popover.Content>
        </Popover>
      </Overlay>
    );
  }
}
export default CustomEventOverlay;
