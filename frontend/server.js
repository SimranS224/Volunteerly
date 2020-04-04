const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/dist'));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/dist', 'index.html'));
});

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
} else {
    // production code
    console.log("in production")
	process.env.REACT_APP_BACKEND_PORT = process.env.REACT_APP_BACKEND_PROD
}

app.listen(port);