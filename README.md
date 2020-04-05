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
B. Run the below commands to build then serve built production files, output will be in dist folder.
 ```
   npm run build
   npm start
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
B. You can access the app at port: ``` http://localhost:3004/```

## Features

 
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
* A JWT token is stored as a cookie once a user logs in, and is used as a header when calling APIs that require authentication. The backend server will verify the token on each request to a protected route.
 
#### Attending Events
 
* When a user attends, the Event organizers will give him a QR code to scan. Once user scans QR code, he will be taken to a login page if he's not already authenticated, at which point the website will automatically check him as attended for the event. Application then updates the user's statistics and achievements, if necessary.
 
 #### Routing

 * All undefined urls are caught and redirected to /home.
 * /profile and /admin can only be accessed by users that are logged in and properly authenticated, they will be redirected to /login otherwise.

## Admin
 
> The entire application has one admin, who manages all of the events. The benefit of this is that the admin can vet the organizations, making sure they are legitimate. This stops spam users, as well as organizations creating events that are not fit for the Volunteerly platform
 
 ### New Features(developed in phase 2)
1. Admin can add an event, specifying the event name, description, and date of the event. Once he modifies it, it becomes available to all users.
2. All of the events that an admin creates get generated in the "manage events" section.
3. Admin can delete an event from his events section.
4. Each event has a QR code. The admin shares the QR code with event organizers, who then display it at their event.
5. QR codes store the url that allows a volunteer to confirm that they have attended an event. It is simply /event_login/{event_id} However, to prevent users from randomly brute forcing urls, we encrypt the event_id using AES encryption.
6. When attending an event, the QR code redirects the user to /event_login/{some encrypted token} and decrypted the token to get the event_id.
7. Event page was redesigned to show more information and in a visually appealing way. We included extra information such as the organization
that created the event, as well as images that the event creator
uploaded.
8. The homepage shows events from the database instead of mock data.
9. Users can enroll in an event and have their enrolled events be shown on their profile. 
10. Users can select preferences of what type of events they want to see, which will be reflected by the events shown.
11. When attending an event, appropriate statistic calculations and achievements are processed.
12. The production version of the frontend will be minimized and console.logs will automatically be removed by Webpack. 
13. Added a frontend express server to serve built React files for deployment.
14. Added API routes to clear the database and refill it with template data.
15. Integrated Sequalize to perform SQL queries and construct the neccessary tables for our PostgreSQL database.
16. Added JWT tokens to protect private APIs. This means users must be logged in, in order to have the neccessary token for those routes.
 
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
 
# Route description

----
----
**Authorization header (used for all requests below):**
----
* Key: Authorization
* Value: ```Bearer {{JWT_TOKEN}}```
----
____

----
 
**Login Resource**
----
  Login a user 
  
**Login**
Authenticates a user and produces, a token that they can use 
for future api requests, as well as information about the authenticated user such as their name, profile picture, and email.
* **URL**
`$host$/api/login/` 
  
* **Method:**

  `POST`

* **Body Params**
```
  {"email": "admin", "password": "admin"}
```

* **Success Response:**

```
  {
    "statusCode": 200,
    "msg": "",
    "id": 6,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNTg2MDU2OTQzfQ.WXxLyBL_nfC20I7g8lHJBdlTP00hcbWaKJttsEE9xlU",
    "level": 1,
    "first_name": "admin",
    "last_name": "admin",
    "profile_picture_url": "https://volunteer-app-images.s3-ca-central-1.amazonaws.com/temp-profile.jpeg"
}

```




**Volunteer Resource**
----
  Get and add a user or get information about them. 

  
**GET Specific volunteer**
Returns information about a specific volunteer
* **URL**
`$host$/api/volunteers/` 
  
* **Method:**

  `GET`

* **Success Response:**
```
  {
    "statusCode": 200,
   
}

```
 
`$host$/volunteers/:user_id` : get specific volunteer
```
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
```

**Register**
Registers a new user. This is used as part of the registration
page.
* **URL**
`$host$/api/volunteers/` 
  
* **Method:**

  `POST`

* **Body Params**
```
  {
    "first_name": "Nick", 
    "last_name": "test",
    "email":"test@gmail.com", 
    "password":"qwerty", 
    "profile_picture_url":"url"
  }
```

* **Success Response:**
```
  {
    "statusCode": 200,
    "headers": {
        "Content-Type": "text/plain"
    },
    "email": "test2@gmail.com",
    "id": 8,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QyQGdtYWlsLmNvbSIsImlhdCI6MTU4NjA1NzMzOH0.N0pj9cJ_WOO9obENJAYaO2N6LiTj3sB4YNS7OD0miE8",
    "level": 0,
    "msg": ""
}
```
**Preference Resource**
----
We have 2 preferences: **event_types**, which include the types of events that the user wants(Fundraising, Translation, Research), and **availability**. which contains dates and times weekly when the user is available.


**Get preferences for a user**
Gives a user's availability as well as events that 
match their preferences.
* **URL**
`$host$/api/preferences/:user_id` 
  
* **Method:**

  `GET`


* **Success Response:**
```
  {
    "statusCode": 200,
    "body": {
        "availability": [
            {
                "id": 37,
                "volunteer_id": 1,
                "day_of_week": "Thursday",
                "start_hour": 13,
                "end_hour": 14
            },
            ...
        ],
        "event_preference": [
            {
                "volunteer_id": 1,
                "event_type_id": 9,
                "event_type": {
                    "id": 9,
                    "text": "Trustee"
                }
            }
        ]
    }
}
```
 
**Update a user's preferences**
Posts the preferences for a user, specifically when the user is available, and categories of events he prefers.

* **URL**
`$host$/api/preferences/:user_id` 
  
* **Method:**

  `POST`

* **Body Params**
```
  {
    "availability": [
        {
            "id": 1,
            "volunteer_id": 1,
            "day_of_week": "Saturday",
            "start_hour": 5,
            "end_hour": 10
        },
        {
            "id": 2,
            "volunteer_id": 1,
            "day_of_week": "Sunday",
            "start_hour": 4,
            "end_hour": 10
        }
    ],
    "event_preference": [
        {
            "volunteer_id": 1,
            "event_type_id": 1
        },
        {
            "volunteer_id": 1,
            "event_type_id": 9
        }
    ]
}
```

* **Success Response:**
```
  {
    "statusCode": 200,
    "body": {
        "availability": [
            {
                "id": 36,
                "volunteer_id": 1,
                "day_of_week": "Saturday",
                "start_hour": 5,
                "end_hour": 10
            }...
        ],
        "event_preference": [
            {
                "volunteer_id": 1,
                "event_type_id": 1
            } ...
        ],
        "eventWithValidDates": [
            {
                "id": 1,
                "name": "Finstone Beaches",
                "start_date": "2020-11-13T05:00:00.000Z",
                "end_date": "2020-11-23T05:00:00.000Z",
                "description": "Clean up the beaches at Fintone!",
                "location": "Abashiri",
                "event_category_id": 9,
                "photo_url": "https://volunteer-app-images.s3.ca-central-1.amazonaws.com/finstonebeaches.jpeg",
                "start_time": 10,
                "end_time": 23,
                "organization_id": 2,
                "duration": 13
            } ... 
        ]
    }
}
```

**Enrollments  Resource**
----

Enrollments are used to get the events that a user has signed up for as well as events that a user has attended.

**Get enrolled events**
user_id is the id of the user to get enrolled events for. The route returns in its’ body all the events that a user has enrolled in.

* **URL**
`${host}/enrollments/:user_id`
  
* **Method:**

  `GET`

**Enroll in an event**
Adds enrollment for a user. Makes the user with user_id enrolled in event event_id.


* **Method:**

  `POST`

* **URL**
  `$HOST/enrollments/`
* **Body Params**

```
{
   user_id: 1,
   event_id: 5
}
```
 
`POST $HOST/enrollment/attended`
Example request body:
```
{
   user_id: 1,
   event_id: 5
}
```

**Attended  Resource**
----

* **URL**
`$HOST/attended/:user_id`
user_id is the id of the user to get attended events for. The route returns in its’ body all the events that a user has attended.
* **Method:**
  `POST`
 
 
#### Events 
**Get User EVENTS**
The route returns in its’ body all the events for a user based on their preferences.
* **URL**
`${host}/events/:id` 
:id is the id of the user to get attended events for. 
* **Method:**
  `GET`

 
**Get EVENTS**
Gets all events in the database
* **URL**
`${host}/events/` 
* **Method:**
  `GET`
  
**Get EVENTS**
Creates a new event with the data given in the body.
* **URL**
`${host}/events/` 
:id is the id of the user to get attended events for. 
* **Method:**
  `POST`
 
 
`DELETE $HOST/:event_id`
:event_id is the id of the event to delete.
 
#### Organizations
`GET $HOST/organizations/`
Returns a body with all the organizations that exist. 

#### Statistics
http://localhost:3004/dev/api/statistics/:user_id
Returns a body with all statistics for a specific user. There are 3 statistics per user(number of hours, number of organizations, and number of events), so each request will return the quantity achieved for each statistic(along with a lot of relevant information regarding statistics)

##### Event_Types

`GET $HOST/event_types`
Returns all of the categories for events in the application(Cleanup, Hospital, Translation, Fundraising, Homeless, etc).

##### Database Migrations

`DELETE $HOST/database`:  DELETES all of the data in the database
Returns a 200 OK if successful.
`GET $HOST/database`: Initializes the tables and posts the JSON mock data to the database.
> Note: This resource is used for internal purposes only to speed up development.
Returns a 200 OK if successful.