Require:
1. Docker@20.0.6
2. PostgreSQL@latest


## Local deployment
### data base
#### Start with docker-compose
```shell
docker-compose up -d
```
#### Start with shell script
```
./scripts/migrate.sh
```
Connect PostgreSQL
```
psql -h localhost -p 5432 -U postgres -W
```
Adminer
open Adminer at http://localhost:8080 and enter the following information:
* System: PostgreSQL
* Server: one_account_database
* Username: postgres
* Password: admin
* Database: one_account_database
### python env
```shell
python3 -m venv one_account
python3 -m one_account pip install psycopg2-binary
```

## API
### /expense
POST /example
```json
{
  "description": "罗技 MX Master3S 黑",
  "amount": 449.00,
  "tags": ["淘宝", "电脑外设"]
}
```