# Browser Tests

To understand how these are run see the `test:browser` task in the root [package.json](../package.json).
The idea is to start the server, run migrations against a test database, and then run these 
browser tests using [webdriverio](http://webdriver.io/). This module is based off the 
[example typescript project](https://github.com/WillLuce/WebdriverIO_Typescript). 
Webdriver.io has its own test runner so Jest is not used, just Jasmine is used to keep tests consistent. 
