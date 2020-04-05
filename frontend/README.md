# team48: Volunteerly

## Deployed Version

https://csc309-volunteer-web.herokuapp.com/home

## Local Usage 


A. Run  the below commands to use in development. 
  ```
    npm install 
    npm run start 
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
  

## Features


### User 


#### Hompage

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
## Code strucure: 
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
