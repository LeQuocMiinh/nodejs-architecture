## NodeJs Architecture

### Architecture

-   `/` - Root contains all standalone configurations files (`package.json`, `.prettierc`, `.env`, `.jsdoc.conf`)
-   `/bin` - Contains the network configuration
-   `/config` - Configuration parameters for app, services and everything else
-   `/docs` - Contains the documentation files generate with **jsdoc**, generally not pushed to the repository
-   `/scripts` - Contains utilities scripts for the application
-   `/src`
    -   `/controllers` - Take input from the route and invoke the appropriate action/service to execute
    -   `/controllers/middleware` - Middleware used in the application
    -   `/loaders` - Contains all modules to load when starting the application
    -   `/models` - Definition of the database entries/tables
    -   `/routes` - Initialize and associate routes with controllers
    -   `/services` - Execute the logic for a given actions
    -   `/utils` - Utility libraries for formatting, validation
-   `/tests` - Contains all test cases for the app

### About

#### Testing

Testing on Travis CI [![Build Status](https://travis-ci.org/fedemengo/nodejs-architecture.svg?branch=master)](https://travis-ci.org/fedemengo/nodejs-architecture)

The testing procedure consist of mocha/chai test cases are are run during build by Travis CI

#### Validation

A simple validation middleware uses Joi for validating and sanitizing the data. It's easy to add a new route-specific validation by defining the data schema in `src/_cars/middleware/validation.js`. If the `pack: true` options is passed when the middleware is instantiated, after validation the sanitized/cleaned data is merged (this could cause problems) and placed in `req._sanitized` otherwise the dat is kept in its place (`req.query`, `req.params`, `req.body`)

#### Patterns

-   [x] **Dependency Injection** - To load all required modules, I'm using a Dependency Injection Container as described in [Node.js Design Patterns](https://www.nodejsdesignpatterns.com/). This pattern allow to load a modules by specifying its dependencies by name and registering the appropriate factory for instancing the name, in this way it's easy to avoid hardcoded dependencies.

-   [ ] **Proxy** - Tools like [Joi](https://github.com/hapijs/joi) can be easily added to the application by using a Proxy, this would allow for a quick removal of the tool without having to modify the code

### Notes

-   https://github.com/i0natan/nodebestpractices

#### Architecture

-   https://www.caffeinecoding.com/better-express-routing-for-nodejs/
-   https://www.freecodecamp.org/news/writing-scalable-architecture-for-node-js-2b58e0523d7f/
-   https://softwareontheroad.com/ideal-nodejs-project-structure/
-   https://medium.com/codebase/structure-of-a-nodejs-api-project-cdecb46ef3f8

##### Details

-   Bin
    -   Idea: separate the network configuration from the app logic, in order to be able to test API endpoints without having to make explicit HTTP requests
    -   packages: [supertest](https://www.npmjs.com/package/supertest)
-   Config
    -   Idea: it's necessary to support configuration variable from files and overriding of those variables using environmental variables
    -   packages: [nconf](https://www.npmjs.com/package/nconf), [dotenv](https://www.npmjs.com/package/dotenv), [config](https://www.npmjs.com/package/config)
-   Loaders
    -   Idea: Most likely it will contain DB setups. [Loaders example](https://softwareontheroad.com/ideal-nodejs-project-structure/#loaders)
    -   packages: [microframework-w3tec](https://www.npmjs.com/package/microframework-w3tec)
-   Docs
    -   Idea: Just because it's important to document the code
-   Services
    -   Idea: there is no distinction between external (call to remote APIs) and internal services (logic we defined). In case we want to replace an internal/external service with an external/internal is sufficient to change the implementation, without modifying the project structure (it would happened if we separate internal/external services). My take against [this](https://medium.com/codebase/structure-of-a-nodejs-api-project-cdecb46ef3f8)

#### Tools

-   prettier
-   jsdoc
