# Schedule
## 

Schedule is an React front end single page web application built with modern practices that allows students easily schedule interviews with staff.

## Final Product

!["Main Page"](https://github.com/willianchu/scheduler/blob/master/imgs/main.jpg)

!["create"](https://github.com/willianchu/scheduler/blob/master/imgs/insert.jpg)

!["edit"](https://github.com/willianchu/scheduler/blob/master/imgs/edit.jpg)

!["saving"](https://github.com/willianchu/scheduler/blob/master/imgs/saving.jpg)

!["Catching Error"](https://github.com/willianchu/scheduler/blob/master/imgs/error.jpg)

## Dependencies

Actually there are several dependencies of open source projects to work properly.
Instructions on how to use them in your own application are linked below.

## Getting Started

1. Install dependencies with `npm install`.
2. you will need to run a schedule-api server to work properly.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
4. Start the web server using the `npm start` command. The app will be served at <http://localhost:8000/>.

## Known Issues
After splitting the code into multiple files, the Axios library is taking too long to load, generating many blanks objects instances.
* This causes a first page with "ghost" elements or un match counter for example.
It will work properly after switching to another day and clicking back on the "Monday" again.
* There is another issue that was explained in the lecture. If you save the interview schedule, without selecting a interviewer, the database will degrade.
the tables are normalized and dependent of id's.
* Once at several inputs and deleting maybe occur a blank label after a prolonged time saving. 


