<h1 style = "text-align: center">Tadoo!</h1>
<h4 style = "text-align: center;"><em>Do you tadoo?</em></h2>


## Introduction

Are you tired of having to sort your own to-do list every time you need a reminder of all the things you need to do?

Add a little magic in your life with our latest app: Tadoo!

Tadoo is a single page application that will take whatever task you enter and automatically sort it into a category that Tadoo sees fit.

<div style = "text-align: center"><img src = "https://github.com/xrysen/smart-to-do-list/blob/readme/docs/magic.gif?raw=true"></div>

<br />It was built using node, SQL, jQuery, jQuery UI, HTML, SCSS and Javascript

## Features

Here are some things you can do with Tadoo:

* Create a new task that is sorted for you!
* Don't like where Tadoo has placed your task? No prob! Simply use the move button that appears beside your task and move it to the correct category.
* Alternatively you can also drag and drop your task onto the category of your choice!
* Tadoo also sets a default urgency rating of 1 star to each task. You can easily edit this by clicking the star rating of your choice.
* Collapsable lists and current run count of how many things you still need ta-doo.
* Check your task off when completed and it will send it over to the archives where you can remind yourself of all things you've accomplished!
* Don't want a glaring reminder of your less-than-proud-of tasks? No worries, simply click delete and on confirmation it will vanish forever!

## Screenshots
<img src = "https://github.com/xrysen/smart-to-do-list/blob/readme/docs/ss1.png?raw=true">
<img src = "https://github.com/xrysen/smart-to-do-list/blob/readme/docs/ss2.png?raw=true">

## Contributors (Taskcomplete)

- [Adam Tyler](https://github.com/mradamt) 
- [Arthur Remy](https://github.com/remy29)
- [Sean Oyler](https://github.com/xrysen)

## Build Process

Run npm install to install all dependancies. <br />
Next create a database and run schema/01_users.sql, 02_categories.sql and 03_tasks.sql to setup your tables<br />
Create a .env file and use .env.example as a guide to setting up your own <br />
Run npm run local to start your server!

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- body-parser 1.19 or above
- chalk 2.4 or above
- dotenv 2.x or above
- ejs 2.6 or above
- express 4.17 or above
- morgan 1.9 or above
- node-sass-middleware 0.11 or above
- request-promise-native 1.x or above
- cookie-session 1.3 or above
