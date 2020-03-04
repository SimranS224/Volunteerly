# team48
# Features
Users can view events on the homepage and also search for specific events
# Usage 
A. Run  the below commands to use in development. 
  ```
    npm install 
    npm run start 
  ```
B. Run the below commands to build, output will be in dist folder.
  ```
    npm run build 
  ```
C. You can access the app at port: ``` http://localhost:3000/```

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
Admin users will have access to http://localhost:3000/admin and all authenticated users can access their profile at http://localhost:3000/profile. Redirected to login if users are not authenticated.
  


# Steps: 

## User 

1. Once the app starts the user will see the home page, and events. 
2. To access other pages the user must first login using the login steps provided above. 
3. Then the user can see their profile which has hard coded values currently
4. They can browse events on the homepage by searching an event, when they click on an event they can see more details 
about it and can also see where it is on a google maps api view. 

## Admin

1. Admin can add an event, specifying the event name, description, and date of the event. Once he modifies it, it becomes available to all users.
2. All of the events that an admin creates get generated in the "manage events" section.
3. Admin can delete an event from his events section.

# Folder Structure

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
