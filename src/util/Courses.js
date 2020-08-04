import Socket from "./socket"
import Constants from "../constants/BackendEP.json"
async function getCourses(payload){
    
    let response = await Socket.sendPOSTHTTP(Constants.backendURL, Constants.retrieveClassesEP,payload);
    return response;
}

async function getDescription(payload){
    let response = await Socket.sendPOSTHTTP(Constants.backendURL, Constants.getCourseDescriptionEP, payload);
    return response;
}

async function saveCourses(payload){
    let response = await Socket.sendPOSTHTTP(Constants.backendURL, Constants.saveClassesEP, payload);
    return response
}

async function loadCourses(payload){
    let response = await Socket.sendPOSTHTTP(Constants.backendURL, Constants.loadClassesEP, payload);
    return response
}

export default {
    getCourses,
    saveCourses,
    loadCourses,
    getDescription
};