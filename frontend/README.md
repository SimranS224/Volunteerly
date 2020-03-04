# team48

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

1. Once the app starts the user will see the home page but wont have the ability to see any events until 
2. 
3. 
4. 
5. 
6. 


## Admin 

1. 
2. 
3. 
4. 
5. 
6. 

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
  │   ├── _components
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
