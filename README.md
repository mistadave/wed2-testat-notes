# wed2-testat-notes ![Build Status](https://travis-ci.org/mistadave/wed2-testat-notes.svg?branch=master)
Notizen-Webapplikation um notizen zu verwalten.

* nedb [documentation](https://github.com/louischatriot/nedb#creatingloading-a-database)
* express [documentation](http://expressjs.com/en/guide/routing.html)
* express-hbs (handlebars) [documentation](https://github.com/barc/express-hbs)

## Automated watching changes

To run the server with watching file changes just run the following command.

```
gulp
```

## First time start project

In order to run the project, you need to have node-js installed on your machine. 
You need nodejs  V6.12.0 or higher.

[Download link](https://nodejs.org/en/download/)

After successful installing node you need to install de dependencies of this project. Run the following command in your project folder.

```bash
npm install
```

## Manual start server

To start the server manually use the following command.

```
npm start

# Windows with debug
set DEBUG=wed2:* & npm start
```