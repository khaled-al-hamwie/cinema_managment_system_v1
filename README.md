# cinema managment system

managing a cinema is a hard task to do, and If it is not managed write that could lead to a disaster and a huge lost to you
and that why we have created a managment system for you, that will do the hard stuff for you, the repedative stuff and make you focus on the important stuff on making money

our cinema managment system is design to be used by :

1. your cinema staff member
2. your customer

were each one of them can

## Features

here is the list of the feature that the api provide

### For Stuff

- add ,remove movies
- add ,remove crew to the movie
- add ,remove genra to the movie
- manage the coins transaction
- manage the item and movies purchases
- manage the ticket and movies sessions

### For Customer

- surfe the movies
- add movie to his watch list
- check the movies crew and genra
- check the movies rating and rating movies
- buy ticket for the movies
- buy items from the movie store like murch and pop corn

## ERD

and here is an erd for the app

![usecase Diagram](./extra/ERD.png)

## technology used

We have used in this project :

- [Node js](https://nodejs.org/dist/latest-v18.x/docs/api/documentation.html) version 18.16.0 with the framwork [nest.js](https://docs.nestjs.com/)
- [typeorm](https://typeorm.io/) as ORM to interact with [Mysql database](https://dev.mysql.com/doc/)
- and for the auth we use [Passport](https://www.passportjs.org/docs/) session and store it in [redis database](https://redis.io/)
- and for the authorization we used [CASL](https://casl.js.org/v6/en/guide/intro) because we had roles for user
- and finally for validating the comming request we used [class validator](https://github.com/typestack/class-validator#validation-decorators)

## setting up

before you start make sure you have

- node js, you can check that using `node -v`
- mysql database running on your device
- redis database running on your device

now to start you should :

- run `nvm use` if you are using [node js version manager](https://github.com/nvm-sh/nvm)
- run `npm i` to install the required library
- rename .env.sample to .env and set up your database credential and add your own session secret
- now create the mysql database that you have set it up in the .env.sample
- and finally run `npm run start:dev` and the server will run on `http://localhost:4000/`
- if you are using [vs code](https://code.visualstudio.com/) you can download the [thunder client](https://code.visualstudio.com/) and import the thunder collection inside the `extra/thunder-collection_cinema_managment_system_dev_v1.json` to see the request collection

## contact

[github](https://github.com/khaled-al-hamwie)
[linked in](https://www.linkedin.com/in/khaled-al-hamwie-869237200/)
[email](khaledAlHamwieContactAcccount@gmail.com)
