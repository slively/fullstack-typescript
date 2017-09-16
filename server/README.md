# Server

This server implements a simple todos rest api using the following libraries:

- routing/http
  - expressjs
- logging
  - winston
- config
  - dotenv
- database access & migrations (postgresql)
  - knex
- runtime validation
  - class-validator
- authentication
  - TODO (passport)
- authorization
  - TODO (acl, node-acl, simple-acl, ...)
- sessions
  - TODO (express-session)

## Tasks

```
startDev // migrate the database and start the server in development mode that restarts on file change
start // migrate the database and start the server in production mode
build // TODO
test // run tests
testWatch // run tests using the jest watcher (reruns efficiently on file change)
createMigration // create a new migration script (goes to src/database/migrations)
```
