# Service Tests

To understand how these are run see the `test:service` task in the root [package.json](../package.json).
The idea is to start the server, run migrations against a test database, and then run these 
browser tests using Jest and supertest.
