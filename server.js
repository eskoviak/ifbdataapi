'use strict';
/**************************************************************************************************
 * This sample demonstrates the most simplistic usage of Swagger Server.
 * It simply creates a new instance of Swagger Server and starts it.
 * All functionality is provided automatically by Swagger Server's mocks.
 **************************************************************************************************/

// Set the DEBUG environment variable to enable debug output
process.env.DEBUG = 'swagger:*';

// Create a Swagger Server app from the PetStore.yaml file
var swaggerServer = require('swagger-server');
var app = swaggerServer('swagger.yaml');

// Start listening on port 8000
app.listen(8082, function() {
  console.log('The Swagger API is now running at http://localhost:8082');
});
