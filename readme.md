# README
[toc]
Require:
1. Docker@20.0.6
2. Node@16


## Local deployment
### Data base
#### Start with docker-compose
```shell
docker-compose up -d
```
#### Start with shell script
```
./scripts/run.sh
```
* Connect PostgreSQL
```
psql -h localhost -p 5432 -U postgres -W
```
* Run server
```
node ./app/server.js
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
The `oneaccount-one_account_database-1` is docker container name, replace to your container after docker-compose up
```shell
docker exec -t oneaccount-one_account_database-1 pg_dump -U postgres -d postgres > db_backup.sql
```
## API
### POST /example
*request body*
```json
{
  "description": "罗技 MX Master3S 黑",
  "amount": 449.00,
  "tags": ["淘宝", "电脑外设"]
}
```