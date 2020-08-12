import Course from "./Courses"
const {JSDOM} = require("jsdom");



async function parseHTML(param){
    const retrievedClasses = 200;
    let classInfo = [];
    let info ={
        "isClass":false
    }  
    let classIDMap = {}
    let courseOrder = [];
    let dom =  await new JSDOM(param.html)
        //console.log("Recieved response from: " + Url + SearchEP + ", now parsing html.");
        dom.window.document.querySelectorAll("tr").forEach(item =>{
            const outputString = item.textContent.replace(/[\n\r]+|[\s]{3,}/g, "||");
            const split = outputString.split("||").filter(text => (text !== "" && text !== " "));
            info = organizeString(split,info.isClass);
            if(info.isClass){
                if(Object.keys(info).length === 2){
                    classInfo.push(info.classInfo);
                    if(!classIDMap[info.classInfo.name]){
                        classIDMap[info.classInfo.name] = true;
                        courseOrder.push(info.classInfo.name);
                    }
                }
                else{
                    classInfo[classInfo.length - 1].location.push(info.location);
                    classInfo[classInfo.length - 1].date.push(info.date);
                    classInfo[classInfo.length - 1].meetingTimes.meetings.push(info.meetingInfo);
                }
            }
        })
    
    let mongoFindCommand = [];
    Object.keys(classIDMap).forEach(key =>{
        mongoFindCommand.push({
            "course_id":key
        });
    });
    let payload = {
        course_id:mongoFindCommand
    }
    let finalResponse 
    await Course.getDescription(payload)
    .then(response =>{
        if(response.data.resultCode === retrievedClasses){
            finalResponse = {
                "classDescription":response.data.classDescription,
                "classInfo":classInfo,
                "courseOrder":courseOrder,
                "coursesFound":true
            }
            //console.log(response);
        }
        else{
            finalResponse = {
                "classInfo":classInfo,
                "courseOrder":courseOrder,
                "classDescription":[],
                "coursesFound":true
            }
        }
    })
    .catch(error =>{
        finalResponse = {
            "classInfo":classInfo,
            "courseOrder":courseOrder,
            "classDescription":[],
            "coursesFound":true
        }        
    })
    return finalResponse;
}

function organizeString(text, isClassInfo){
    let data = {};
    if(text.length > 3){
        if(text[2].length === 5 && !isNaN(text[2])){
            let classInfo = {
                "status":"",
                "name":"",
                "CRN":"",
                "cred":"",
                "meetingTimes":"",
                "location":[],
                "capacity":"",
                "activated":"",
                "instructor":"",
                "email":"",
                "date":[],
                "weeks":""
            }
            for(let i = 0; i < 4; i++){
                switch(i){
                    case 0:
                        classInfo.status = text[i];
                        break;
                    case 1:
                        classInfo.name = text[i];
                        break;
                    case 2:
                        classInfo.CRN = text[i];
                        break;
                    case 3:
                        classInfo.cred = text[i];
                        break;
                    default:
                        break;
                }
            }
            let lastIndex = text.length - 1;
            let meetingData;
            let isStaff = false;
            text.forEach((item)=>{
                if(item === "Staff")
                    isStaff = true;
            })
            if(isStaff){
                for(let i = lastIndex; i > lastIndex - 7; i --){
                    switch(i){
                        case lastIndex - 6:
                            classInfo.location.push(text[i].trim());
                            break;
                        case lastIndex - 5:
                            classInfo.capacity = text[i];
                            break;
                        case lastIndex - 4:
                            classInfo.activated = text[i];
                            break;
                        case lastIndex - 2:
                            classInfo.instructor = text[i];
                            break;
                        case lastIndex - 1:
                            classInfo.date.push(text[i]);
                            break;
                        case lastIndex:
                            classInfo.weeks = text[i];
                            break;
                        default:
                            break;
                    }
                }
                meetingData = text.slice(4, text.length - 7);
            }
            else{
                for(let i = lastIndex; i > lastIndex - 8; i --){
                    switch(i){
                        case lastIndex - 7:
                            classInfo.location.push(text[i].trim());
                            break;
                        case lastIndex - 6:
                            classInfo.capacity = text[i];
                            break;
                        case lastIndex - 5:
                            classInfo.activated = text[i];
                            break;
                        case lastIndex - 3:
                            classInfo.instructor = text[i];
                            break;
                        case lastIndex - 2:
                            classInfo.email = text[i];
                            break;
                        case lastIndex - 1:
                            classInfo.date.push(text[i]);
                            break;
                        case lastIndex:
                            classInfo.weeks = text[i];
                            break;
                        default:
                            break;
                    }
                }
                meetingData = text.slice(4, text.length - 8);
            }

            let meetingInfo = {
                "meetings":[]
            };
            if(meetingData.length > 1){
                let meetings ={
                    "info":"available",
                    "days":"",
                    "time":""
                }
                let days = "";
                meetingData.forEach((item,key)=>{
                    if(key === meetingData.length - 1){
                        meetings.time = item
                    }
                    else{
                        days += item + " ";
                    }
                })
                //meetings.days.push(days.slice(0,days.length - 1));
                meetings.days = days.trim();
                meetingInfo.meetings.push({
                    "info":meetings.info,
                    "days":meetings.days,
                    "time":meetings.time
                });
            }
            else{
                meetingInfo.meetings.push({
                    "info":"N/A",
                    "description":meetingData[0]
                })
            }
            classInfo.meetingTimes = meetingInfo;
            //if(classInfo.meetingTime.info !== "n/a")
                //console.log(classInfo.meetingTime.meetings);
            //console.log(classInfo);
            return data = {
                "classInfo":classInfo,
                "isClass":true
            }
        }
        else if(text.length <= 9 && isClassInfo){
            let meetings;
            if(checkIfDate(text[text.length - 1])){
                let meetingData = text.slice(0,text.length - 2);
                if(meetingData.length > 1){
                    let days = "";
                    let time = "";
                    for(var i = 0; i < meetingData.length; i ++){
                        if(i !== meetingData.length - 1){
                            days += meetingData[i] + " ";
                        }
                        else{
                            time = meetingData[i];
                        }
                    }
                    meetings ={
                        "info":"available",
                        "days":days.trim(),
                        "time":time
                    }
                }
                else{
                    meetings ={
                        "info":"N/A",
                        "description":text[0]
                    }
                }
                data = {
                    "isClass":true,
                    "date":text[text.length - 1],
                    "location":text[text.length - 2],
                    "meetingInfo":meetings
                }
                return data;
            }
            else{
                return data = {
                    "isClass":false
                }
            }
        }
    }
    //text data has no class information
    return data = {
        "isClass":false
    }
}



function checkIfDate(text){
    const split = text.replace(/ /g,'').split("-");
    let answer = true;
    split.forEach(item =>{
        item.split("/").forEach(number =>{
            if(isNaN(number)){
                answer = false;
            }
        });
    });
    return answer
}

function constructQueryParam(request){
    const body = request;
    var queryParam = "?";
    Object.keys(body).forEach(prop =>{
        if(Array.isArray(body[prop])){
            body[prop].forEach(item =>{
                queryParam += prop + "=" + item + "&";
            })
        }
        else{
            queryParam += prop + "=" + body[prop] + "&";
        }
    })
    return queryParam;
}

export default {
    parseHTML,
    constructQueryParam
}


/*
    const resourceLoader = new ResourceLoader({
        strictSSL:false
    })
    await JSDOM.fromURL(Url + SearchEP + param, {resources: resourceLoader})
        .then(dom => {
        //console.log("Recieved response from: " + Url + SearchEP + ", now parsing html.");
        dom.window.document.querySelectorAll("tr").forEach(item =>{
            const outputString = item.textContent.replace(/[\n\r]+|[\s]{3,}/g, "||");
            const split = outputString.split("||").filter(text => (text !== "" && text !== " "));
            info = organizeString(split,info.isClass);
            if(info.isClass){
                if(Object.keys(info).length === 2){
                    classInfo.push(info.classInfo);
                    if(!classIDMap[info.classInfo.name]){
                        classIDMap[info.classInfo.name] = true;
                        courseOrder.push(info.classInfo.name);
                    }
                }
                else{
                    classInfo[classInfo.length - 1].location.push(info.location);
                    classInfo[classInfo.length - 1].date.push(info.date);
                    classInfo[classInfo.length - 1].meetingTimes.meetings.push(info.meetingInfo);
                }
            }
        })
    })
*/