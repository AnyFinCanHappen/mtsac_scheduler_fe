## Mt. Sac Scheduler (Front End)

Web app that will help students schedule their classes.


## How to install for development
1)  Clone repository into your local repository
2)  Install dependencies using npm
      ```
      npm install
      ```
3)  Run the web app
    ```
    npm start
    ```
    Now you should be able to see the webpage by typing in **http://localhost:3000** in your browser. 
    If you do not need to access the backend API, you are finised. If you do read further.
    
    Development webpage cannot access backend API due to certificate issues, not sure how to fix it.
    But for now, you can install a development version for the backend (sorry for the inconvenience).
 4)  Post an Issue or send me and email @ **mountieplanner@gmail.com**  to get acccess to backend repository.
     From there, there will be instructions on how to install the backend repository.
 5) Change enpoints to localhost
    In the directory ```src/util/Courses.js```
    Change for desired backend api's
    ```javascript
    let local = "http://localhost:3001/api/";   //used for development
    async function getCourses(payload){
      let response = await Socket.sendPOSTHTTP(Constants.backendURL, Constants.retrieveClassesEP,payload);
      return response;
    }
    ```
    to
    ```javascript
    let local = "http://localhost:3001/api/";   //used for development
    async function getCourses(payload){
      let response = await Socket.sendPOSTHTTP(local, Constants.retrieveClassesEP,payload); //Change parameter
      return response;
    }
    ```
    
    From here, you are ready for development!
    
