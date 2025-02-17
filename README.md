# Node.js Port Binding Error

This repository demonstrates a common error in Node.js when creating an HTTP server: attempting to bind to a port that is already in use.  The `bug.js` file shows the problematic code, and `bugSolution.js` provides a solution.

## Problem

The `bug.js` file creates a simple HTTP server using the `http` module.  If you try to run this server while another process is already using port 8080 (the default port specified in the code), the server will throw an error.

## Solution

The `bugSolution.js` file demonstrates how to handle this situation gracefully.  It uses the `'error'` event listener on the server to catch the error and log an informative message.  It also incorporates a retry mechanism with an exponential backoff to attempt to bind to the port after a delay.  This prevents the server from immediately crashing and gives the application time to recover.