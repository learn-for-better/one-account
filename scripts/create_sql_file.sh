# create flayway file
# Usage: ./create_sql_file.sh <file_name>
# Example: ./create_sql_file.sh V1__create_table.sql
# Result: 20240506154800__v1_create_table.sql

#!/bin/bash

date_time=$(date +%Y%m%d%H%M%S)
file_path=db/migration
file_name="${file_path}/V${date_time}__${1}.sql"
touch ${file_name}

echo "file ${file_name} created successfully!"