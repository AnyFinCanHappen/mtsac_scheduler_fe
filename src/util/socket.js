import Axios from "axios";

const HTTPMETHOD = Object.freeze({
    GET:"GET",
    POST:"POST",
});

function initSocket(baseUrl){
    Axios.defaults.baseURL = baseUrl;
}

async function sendGETHTTP(url,path){
    return await sendHTTPMethod(HTTPMETHOD.GET,url,path);
}

async function sendPOSTHTTP(url,path,data){
    return await sendHTTPMethod(HTTPMETHOD.POST,url,path,data);
}

async function sendHTTPMethod(method, url, path, data){
    let response;
    initSocket(url);
    switch(method){
        case HTTPMETHOD.GET:
            response = await Axios.get(path);
            break;
        case HTTPMETHOD.POST:
            response = await Axios.post(path,data);
            break;
        default:
            response = {
                "message": "Invalid HTTPmethod",
                "resultCode": -2
            };
    }
    return response;
}

export default {
    sendGETHTTP,
    sendPOSTHTTP
}