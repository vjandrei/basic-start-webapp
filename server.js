'use strict';

const express = require('express');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;


/**
 * Starts the Express server.
 *
 * @return {ExpressServer} instance of the Express server.
 */
const startServer = () => {
  const app = express();
  const port = 8000;

  // Redirect HTTP to HTTPS,
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

  // Logging for each request
  app.use((req, resp, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const path = `"${req.method} ${req.path}"`;
    const logMessage = `${req.ip} - ${time} - ${path}`;
    // eslint-disable-next-line no-console
    console.log(logMessage);
    next();
  });

  // Handle requests for static files
  app.use(express.static('public'));

  // Start the server
  return app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Local DevServer Started on port ${port}!'`);
  });
}

startServer();
