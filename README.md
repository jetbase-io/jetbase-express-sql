# JetBase Express.js backend for Postgres

[![Build Status](https://travis-ci.org/jetbase-io/jetbase-express-sql.svg?branch=test)](https://travis-ci.org/jetbase-io/jetbase-express-sql)

Swagger API: https://raw.githubusercontent.com/jetbase-io/jetbase-swagger/master/swagger.yml

# Running express server in docker

In order to start express.js api inside of docker run the following commands

### Build a docker image of node.js app

```
docker-compose build
```

### Create DB, run migrations and create first admin user

```
docker-compose run jetbase-express-sql npm run migrate-seeds
```

### Start node.js app in docker

```
docker-compose up
```

# Running express server local

### Enviroment

Use .env file for enviroment variables.

Example in .env.example file.

### Running

```
npm run start
```
