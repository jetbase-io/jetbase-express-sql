# JetBase Express.js backend for Postgres

[![Build Status](https://travis-ci.org/jetbase-io/jetbase-express-sql.svg?branch=test)](https://travis-ci.org/jetbase-io/jetbase-express-sql)

Swagger API: https://raw.githubusercontent.com/jetbase-io/jetbase-swagger/master/swagger.yml

# Running express server in docker

In order to start express.js api inside of docker run the following commands

```
docker-compose build
```
_this command will build a docker image of node.js app_

_next step we should create database_

```
docker-compose run jetbase-rails npm run seeds-dev
```
_this command will create DB, runn migrations_ and create first admin user

```
docker-compose up
```
_this command will start node.js app in docker_
