# team48: Volunteerly

## Deployed Version

https://csc309-volunteer-web.herokuapp.com/home

We deployed by hosting our PostgreSQL database on Heroku, along with the frontend by building the React files using Webpack and then serving them via ExpressJS. 
The backend is deployed on AWS serverless, which is accessed through a public AWS S3 bucket.
Backend url: https://e3fm1d24f2.execute-api.us-east-1.amazonaws.com/dev/api/
 
## Local Usage

### Frontend
 
A. Run  the below commands to use in development.
 ```
   npm install
   npm run dev
 ```
B. Run the below commands to build, output will be in dist folder.
 ```
   npm run build
 ```
C. You can access the app at port: ``` http://localhost:5000/```
 
D. Login with credentials to be an admin user:
```
username: admin
password: admin
```
Login with the following to be a regular user:
```
username: user
password: user
```

### Backend

A. Run  the below commands to use in development.
 ```
   npm install -g serverless
   npm install
   npm run start
 ```
B. Too get the required creds, please email one of us.

 
 
#### Homepage
 
* On the homepage, the user can see all of the events on the platform.
* To filter for specific types of events, the user has to click on preferences, choose the type of events he wants to see + optionally select the time when he is available, and the events on the home-page will be filtered according to that.
* The user can enroll into an event by clicking on the event, where they see the event details and the enroll button. Once clicked, the event  becomes available on his profile page.
 
#### Profile Page
 
* On the profile page, the user can see a list of the Upcoming Events he enrolled in, and a history of past events he attended.
* Additionally, user can see his statistics: how many hours he volunteered for, how many events he attended and how many organizations he volunteered with.
* User can also see a list of their achievements, which are based on hitting certain statistics.
 
#### LogIn Page
 
* User must log in in order to save their preferences, enrol to events, see his statistics, and achievements. They will be prompted to log in if they try to access any pages other than the homepage, i.e their profile page, or the admin page.
* Once authenticated, the user's status and data is stored in React Redux.
 
#### Attending Events
 
* When a user attends, the Event organizers will give him a QR code to scan. Once user scans QR code, he will be taken to a login page if he's not already authenticated, at which point the website will automatically check him as attended for the event. Application then updates the user's statistics and achievements, if necessary.
 
## Admin
 
> The entire application has one admin, who manages all of the events. The benefit of this is that the admin can vet the organizations, making sure they are legitimate. This stops spam users, as well as organizations creating events that are not fit for the Volunteerly platform
 
1. Admin can add an event, specifying the event name, description, and date of the event. Once he modifies it, it becomes available to all users.
2. All of the events that an admin creates get generated in the "manage events" section.
3. Admin can delete an event from his events section.
4. Each event has a QR code. The admin shares the QR code with event organizers, who then display it at their event.
 
## Folder Structure
 
```bash
 ├── src
 │   ├── Main
 │   │   ├── index.js
 │   │   ├── Main.jsx
 │   ├── HomePage
 │   │   ├── index.js
 │   │   ├── HomePage.jsx
 │   ├── LoginPage
 │   │   ├── index.js
 │   │   ├── LoginPage.jsx
 │   ├── components
 │   │   ├── index.js
 │   │   ├── ....
 │   │   ├── ....
 │   │   ├── NavBar.js
 │   ├── _helpers
 │   │   ├── index.js
 │   │   ├── store.js
 │   ├── _services
 │   │   ├── index.js
 │   │   ├── EventsServices.js
 │   │   ├── UserService.js
 │   ├── _redux
 |   |   ├── _reducers
 |   |   |   ├-- index.js
 |   |   |   ├-- .....
 |   |   |   ├-- .....
 |   |   ├── _actions
 |   |   |   ├-- index.js
 |   |   |   ├-- .....
 |   |   |   ├-- .....
 │   ├── index.html
 │   ├── index.jsx
 ├── .babelrc
 ├── webpack.config.js
 ├── package.json
 └── .gitignore
 ```
## Frontend Code strucure:
 
- All main layout pages have their own folder.
- The corresponding css files can be found in the same folder as the Page or Component.
- Entry point to the app is ```Main.jsx```, located in ```src/Main``` folder
- Current routes are ``/home`` and ```/login```
 
 ### _services
 - Includes all API and DB calls.
 - Currently includes all hardcoded values
 
 ### _components
 - Includes all components such as Navbar
 
 ### _helpers
 - Includes all helper functions and objects such as the store in redux
 
 ### _redux
 - Includes all redux essential data such as actions and reducers
 
## Backend Code Structure:
 
We have 2 main folders: `api` and `db`.
 
1. `api`:
- ` folder for each REST resource(achievements, enrollments, event_types, events, healthcheck...), which includes all relevant actions on those resources(get, patch, post, etc), and the methods for those actions.
 
2. `db`:
- migrations; all of the JSON files with the mock data
- models.ts: Includes the schema of all tables in the database
- index.ts: Initializes the db connection
 
### Route description
 
Volunteer Resource: get/post information about volunteers
 
#### Volunteer Resource
`$host$/volunteers/:user_id` : get specific volunteer
Response:
{
 "id": 5,
 "name": "Nick",
 "email": "test@gmail.com",
 "password": "qwerty",
 "updatedAt": "2020-03-25T22:09:59.871Z",
 "createdAt": "2020-03-25T22:09:59.871Z",
 "bio": null,
 "date_joined": null,
 "profile_picture_UrL": null
}



 
`$host$/volunteers`: POST a new volunteer
Request
{"first_name": "Nick", "last_name": "test","email":"test@gmail.com", "password":"qwerty", "profile_picture_url":"url"}'
Response: 
 
#### Preferences
We have 2 preferences: event_types, which include the types of events that the user wants, and 
/api/preferences/:user_id (get preferences for user id)
/api/preferences/:user_id (post preferences for user id)
 
 
 
#### Enrollments and Attended Events
Enrollments are used to get the events that a user has signed up for as well as events that a user has attended.
 
GET `$HOST/enrollments/:user_id`
user_id is the id of the user to get enrolled events for. The route returns in its’ body all the events that a user has enrolled in.
 
POST `$HOST/enrollments/add`
Example request body:
{
   user_id: 1,
   event_id: 5
}
Makes the user with user_id enrolled in event event_id.
 
POST `$HOST/enrollment/attended`
Example request body:
{
   user_id: 1,
   event_id: 5
}
Marks that the user with user_id has attended the event with event_id.
 
POST `$HOST/attended/:user_id`
user_id is the id of the user to get attended events for. The route returns in its’ body all the events that a user has attended.
 
 
#### Events 
GET `$HOST/events/:id
:id is the id of the user to get attended events for. The route returns in its’ body all the events for a user based on their preferences.
 
GET `$HOST/events/
Returns in its body all events in the database.
 
POST `$HOST/events`
Example request body:
{
"name":"Ottawa Island Cleanup",
"start_date":"2020-08-18T04:00:00.000Z",
"end_date":"2020-08-18T04:00:00.000Z",
"description":"Clean up at Ottawa River, bring your friends",
"location":"Ottawa",
"photo_url":"https://volunteer-app-images.s3-ca-central-1.amazonaws.com/undefined-undefined-undefined-1.jpeg https://volunteer-app-images.s3-ca-central-1.amazonaws.com/undefined-undefined-undefined-0.jpeg",
"Organization_id":1,
"eventType": "Cleanup",
"Duration":1,
"start_time": 20,
"end_time":21
}
Creates a new event with the data given in the body.
 
DELETE `$HOST/:event_id`
:event_id is the id of the event to delete.
 
