import Socket from "./socket"
import Constants from "../constants/BackendEP.json"

let local = "http://localhost:3001/api/";   //used for development
async function getCourses(payload){
    let response = await Socket.sendPOSTHTTP(local, Constants.retrieveClassesEP,payload);
    return response;
}

async function getDescription(payload){
    let response = await Socket.sendPOSTHTTP(Constants.backendURL, Constants.getCourseDescriptionEP, payload);
    return response;
}

async function saveCourses(payload){
    let response = await Socket.sendPOSTHTTP(local, Constants.saveClassesEP, payload);
    return response
}

async function loadCourses(payload){
    let response = await Socket.sendPOSTHTTP(local, Constants.loadClassesEP, payload);
    return response
}

export default {
    getCourses,
    saveCourses,
    loadCourses,
    getDescription
};