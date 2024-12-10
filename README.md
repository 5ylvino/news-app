# NEWS APP
This comprises of both backend and frond-end application, on which backend (news-api) handles all the program interfaces for news-client application.

## Environment Setup
To setup the application on your machine make sure you have the below requirement, then follow the steps mentioned

### Requirements for backend:
- Laravel v11.34.2
- php v8.3.12
- composer v2.8.3
- MySQL

### Requirements for front-end:
- Node 20.18.0
- npm v10.8.2
- react v19.0.0

## Folder structure
```
root>
|
├── docker-compose.yml
|
├── news-api (backend)
│   ├── app
│   │   ├── Http
│   │   │   ├── Controllers
│   │   │   │   └── v1
│   │   │   ├── Middleware
│   │   │   ├── Requests
│   │   │   └── Resources
│   │   ├── Jobs
│   │   ├── Models
│   │   ├── Providers
│   │   └── Services
│   ├── bootstrap
│   │   └── cache
│   ├── config
│   ├── database
│   │   ├── factories
│   │   ├── migrations
│   │   └── seeders
│   ├── public
│   ├── resources
│   ├── routes
│   ├── storage
|   └── dockerfile
│
└── news-client (frontend)
    ├── node_modules
    ├── public
    ├── dockerfile
    └── src
        ├── components
        ├── constants
        ├── pages
        ├── service
        ├── utils
        └── validation
```

### App Setup:
Assuming you already have php, composer, etc. on your machine

1a. clone the app `git clone https://github.com/5ylvino/news-app.git`

1b. Switch to folder `cd news-app`

#### backend
2. Switch to app folder with `cd news-api` and run `composer install` to install all dependencies

3. Create env file from duplicate `cp -rf .env.example .env`. Then copy the news data api keys from the email sent,
otherwise the app won't be able to access news data external

4. Start server by running `php artisan serve`. Host url is `http://127.0.0.1:8000` 

5. New terminal tab, then run the queue `php artisan queue:work` 

6. New terminal tab, then run the job `php artisan schedule:work`

#### front-end
7. Switch to app folder with `cd news-client` and run `yarn install` to install all dependencies

8. Create env file from duplicate `cp -rf .env.example .env`. 
    - Then copy the news data api keys from the email sent,
otherwise the app won't be able to access news data externally viz `NEWS_API_KEY`, `GUARDIAN_API_KEY`, `NYTIMES_API_KEY`. API HOST URL FROM BACKEND is `http://127.0.0.1:8000/api/v1` . It have prefix as shown, so copy and paste. \
    - Setup you Database with `MYSQL DRIVER` viz `DB_CONNECTION=mysql`, `DB_DATABASE=news_api` etc.

9. Start serve by running `yarn start` . Host url is `http://127.0.0.1:3000`


## Security layers
The application consist of the below layers of securities:

1. Laravel sanctum for authentication and authorization

2. Rate Limiting to control the number of incoming requests against DOS attacks

3. Health check endpoint `/check-up`

4. Force HTTPS on production only.

5. Secure the headers to prevent host header attack

6. CORS restriction to allow only the specified client app

7. As security we are using UUID as primary key for each table

## Some core of features
1. Fetches new update by automation via task scheduling every 5 minute. (server)

2. Fetching new update task are executed at the background using queue and also given that it is an asynchronous task. (server)

3. Login, and register for user  (flow)

4. Save preference by user. (flow)

5. Remove preference by user. (flow)

6. View preferences by user. (flow)

7. View list of news articles (flow)

8. Search articles by filtering (flow)

9. Optimized and Manage list state using SWR with HOC strategy (client)

10. Used formik and yup for proper form validation (client)

11. Reusable custom hooks and components, context etc. for clean code base and maintenance (client), etc.


EXAMPLE OF DEMO HOME SCREENSHOTVIEW
<img width="1370" alt="Screenshot 2024-12-09 at 17 44 23" src="https://github.com/user-attachments/assets/abbc54db-c316-4005-afd5-b3718e0a363a">


