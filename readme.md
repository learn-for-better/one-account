[toc]

# Require
1. Docker@20.0.6
2. Node@16

## Start
#### Run with docker-compose
```shell
docker-compose up -d
```
## Local deployment
#### Start with shell script
* run postgresql
* run flyway
* run adminer
```
./scripts/run.sh
```
* Connect PostgreSQL in local
```
psql -h localhost -p 5432 -U postgres -W
```
* Run backend server
```
cd app
npm i
npm start
```
### Adminer
open Adminer at http://localhost:8080 and enter the following information:
* System: PostgreSQL
* Server: one_account_database
* Username: postgres
* Password: admin
* Database: one_account_database

## Backup data
### Export data from docker volume
`oneaccount-one_account_database-1` need replace to your container name
```shell
docker exec -t oneaccount-one_account_database-1 pg_dump -U postgres -d postgres > db_backup.sql
```
## API
[swagger](http://localhost:3003/api-docs)

# References
[Express_Nodejs](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs/development_environment)