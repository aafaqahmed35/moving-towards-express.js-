// Import the Express framework
const express = require('express');

// Create an Express application
const app = express();


// Middleware 1
// This runs for every incoming request because no path is specified.
app.use((req, res, next) => {
    console.log('In the middleware');

    // Pass control to the next middleware in the chain
    next();
});


// Middleware 2
// This also runs for every request after Middleware 1 calls next().
app.use((req, res, next) => {
    console.log('In the another middleware');

    // Pass control to the next middleware.
    // Since there is no more middleware or route handler after this,
    // the request will eventually hang because no response is sent.
    next();
});


// Start the server and listen for incoming requests on port 3000
app.listen(3000);