import React, {Component} from 'react';
import Courses from "../util/Courses";
import Table from 'react-bootstrap/Table';


class SearchResults extends Component{
    constructor(props){
        super(props);
        this.state = {
            result:false,
            classInfo:null,
            classDescription:null
        }
    }

    componentDidMount(){
        this.getClassInfo();
    }

    getClassInfo = () =>{
        console.log("sending")
        const payload = this.props.query;
        Courses.getClasses(payload)
        .then(response =>{
            console.log(response);
            const classes = response.data.classInfo;
            let map = {}
            classes.forEach(item =>{
                if(map[item.name]){
                    map[item.name].push(item);
                }
                else{
                    map[item.name] = [];
                    map[item.name].push(item);
                }
            });
            this.setState({
                result:true,
                classDescription:response.data.classDescription,
                classInfo:map
            });
            console.log("Got data!");
        })
        .catch(err =>{
            console.log(err);
        });
    }

    displayClasses = () =>{
        const{classInfo} = this.state;
        return(
            Object.keys(classInfo).map((className,num)=>{
                return(
                    <div key = {num}>{className}
                    <Table striped bordered size = "sm" key = {num}>
                        <thead>
                                <tr>
                                    <th>Add</th>
                                    <th>CRN</th>
                                    <th>Instructor</th>
                                    <th>Times</th>
                                    <th>Location</th>
                                    <th>Enrollment</th>
                                    <th>Status</th>
                                </tr>
                        </thead>
                        {classInfo[className].map((key, index) =>{
                            const {meetingTimes, location} = key;
                            const {meetings} = meetingTimes;
                            return(
                                <tbody key = {index}>
                                    <tr>
                                        <td>+</td>
                                        <td>{key.CRN}</td>
                                        <td>{key.instructor}</td>
                                        <td>
                                            {
                                                meetings[0].info === "available" ? 
                                                meetings[0].days + " " + meetings[0].time :
                                                meetings[0].description
                                            }
                                        </td>
                                        <td>{location[0]}</td>
                                        <td>{key.activated + "/" + key.capacity}</td>
                                        <td>{key.status}</td>
                                    </tr>
                                    {meetings.length > 1 &&
                                        meetings.map((key,index) => {
                                            if(index !== 0){
                                                return(
                                                    <tr key = {key}>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>
                                                            {
                                                                key.info === "available" ?
                                                                key.days + " " + key.time :
                                                                key.description
                                                            }
                                                        </td>
                                                        {location.length > 1 &&
                                                            <td>{location[index]}</td>
                                                        }
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                );
                                            }
                                            else{
                                                return null;
                                            }
                                        })
                                    }
                                </tbody>
                            );
                        })}
                    </Table>
                    </div>
                );
            })
        );
    }

    render(){
        const {result} = this.state;
        if(result){
            return(
                <div>
                    <this.displayClasses/>
                </div>

            );
        }
        else{
            return(
                <div>
                    loading
                </div>
            );
        }
    }
}
export default SearchResults;