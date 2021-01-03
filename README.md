# **Redis Query Service.**

Setup Instructions

Make sure you have node, redis and npm installed.

1 Clone repository.

````
git clone https://github.com/TdevM/redis_query_service.git
````

2. Install Dependencies.

````
npm install
````

4. Create environment variables file.

````
touch .env
````

5. Paste following to .env

````
export REDIS_HOST=localhost
export REDIS_PORT=6379
````

6. Seed data from csv to redis

````
npm run seed
````

7. Start app

````
npm run start
````
