import Socket from "./socket"
import Constants from "../constants/BackendEP.json"
async function getClasses(payload){
    
    let response = await Socket.sendPOSTHTTP(Constants.backendURL, Constants.retrieveClassesEP,payload);
    return response;
}

export default {
    getClasses
};