# NEWS APIs
This is a backend application that handles all the program interfaces for news-client application.

## Environment Setup
To setup the application on your machine make sure you have the below requirement, then follow the steps mentioned

### Requirements:
Laravel 11.34.2
php 8.3.12
composer 2.8.3
MySQL

### App Setup:
Assuming you already have php, composer and laravel on your machine

1). clone the app `https://github.com/5ylvino/news-app.git`

2). Switch to app folder with `cd news-api` and run `composer install` to install all dependencies

3). Start server by running `php artisan serve`

4). New terminal tab, then run the queue `php artisan queue:work` 

5). New terminal tab, then run the job `php artisan schedule:work` 

## Security layers
The application consist of the below layers of securities:

1). Laravel sanctum for authentication and authorization

2). Rate Limiting to control the number of incoming requests against DOS attacks

3). Health check endpoint `/check-up`

4). Force HTTPS on production only.

5). Security the headers to prevent host header attack

6). CORS restriction to allow only the specified client app

7). As security we are using UUID as primary key for each table

## Features
1). Fetches new update by automation via task scheduling every minute.
2). Fetching new update task are executed at the background using queue and also given that it is an asynchronous task.
3). Login and register for user
4). Save preferences by user.
5). View list of articles
5). View list of articles by filtering

