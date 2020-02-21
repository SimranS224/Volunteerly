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
  

# Folder Structure

```bash
  ├── src
  │   ├── App
  │   │   ├── index.js
  │   │   ├── App.jsx
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
  |   |       ├-- index.js
  |   |       ├-- .....
  |   |       ├-- .....
  |   |   ├── _actions
  |   |       ├-- index.js
  |   |       ├-- .....
  |   |       ├-- .....
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
- Entry point to the app is ```App.jsx```, located in ```src/App``` folder 
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
