# Full Stack TypeScript
I created this project to get a feel for what a full stack typescript project with unit, 
service, and browser tests would look like. The goal was to share interfaces throughout the stack 
 and to keep a consistent feel across all the modules.

## Global Tasks
```
start // start the dev servers for ui and server (will also run install and migrate the database)
install // install dependencies for all modules
test // run tests for all modules
tslint // run tslint for all modules
```

## Modules
- [browser-tests](/browser-tests/README.md)
  - Full stack browser tests from the database to the ui. 
- [buildSrc](/buildSrc/README.md)
  - Build scripts for the entire project (name taken from Gradle).
  - Not currently written in typescript, that is a todo item.
- [server](/server/README.md)
  - Node.js server for a basic todos rest api.
- [service-entities](/service-entities/README.md)
  - Shared domain entity interfaces for the server and client.
- [service-tests](/service-tests/README.md)
  - End to end rest api tests with a test database for the server.
- [ui](/ui/README.md)
  - The browser ui for the simple todos web app.

## Positives
- Types
- All the benefits of the node.js world
- All tests are written in the same style (jest/jasmine)
- Shared interfaces for the server and ui
- Great IDE support
- Sane import paths

## Negatives
- The handful of type definitions in the @types folders 
- Missing a better full stack build tool (ideally written in TypeScript)
- The setup is definitely more work than a vanilla Javascript project

## Known Issues
- Intellij/VS-Code doesn't auto-import from the share 'service-entities' module in the ui or server projects.
- If the ui dev server fails to compile on startup it will not auto-restart on changes until it starts successfully once.
