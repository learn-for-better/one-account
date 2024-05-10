#!/bin/bash


# Set the Flyway configuration
export FLYWAY_URL=jdbc:postgresql://one_account_database:5432/postgres
export FLYWAY_USER=postgres
export FLYWAY_PASSWORD=admin
export FLYWAY_LOCATIONS=filesystem:/db/migration


# Get the script directory
SCRIPT_DIR=$(dirname "$0")
# Get the absolute path
DOCKER_POSTGRESQL_DIR=$(realpath "$SCRIPT_DIR/../dockers/one-account/postgresql")
MIGRATION_DIR=$(realpath "$SCRIPT_DIR/../db/migration")

# Check if the Flyway Docker image already exists
if ! docker image ls | grep -q 'flyway/flyway'; then
    # Pull the Flyway Docker image
    docker pull flyway/flyway
else 
    echo "Flyway Docker image already exists!"
fi

# Check if the Docker network already exists
if ! docker network ls | grep -q 'one_network'; then
    # Create a Docker network
    docker network create one_network
else 
    echo "Docker network 'one_network' already exists!"
fi

# Check if the PostgreSQL container already exists
if ! docker ps -a | grep -q 'one_account_database'; then
    # Run your database container in the 'one_network' network
    docker run --network=one_network --name=one_account_database -e POSTGRES_PASSWORD=admin -p 5432:5432  -d postgres
elif ! docker ps | grep -q 'one_account_database'; then
    echo "PostgreSQL container 'one_account_database' already exists!"
    docker start one_account_database   
fi

# Check if the Adminer container already exists
if ! docker ps -a | grep -q 'my_adminer'; then
    # Run the Adminer container in the 'my_network' network
    docker run --network=one_network --name=my_adminer -p 8080:8080 -d adminer
    # Output the database connection information for Adminer
    echo "Please open Adminer at http://localhost:8080 and enter the following information:"
    echo "System: PostgreSQL"
    echo "Server: one_account_database"
    echo "Username: postgres"
    echo "Password: admin"
    echo "Database: one_account_database"
elif ! docker ps | grep -q 'my_adminer'; then
    echo "Adminer container 'my_adminer' already exists!"
    docker start my_adminer
else 
    echo "Adminer container 'my_adminer' already exists!"
fi

# Run the Flyway container in the 'my_network' network
docker run --network=one_network --rm -v "$MIGRATION_DIR:/flyway/sql" -e FLYWAY_URL="$FLYWAY_URL" -e FLYWAY_USER="$FLYWAY_USER" -e FLYWAY_PASSWORD="$FLYWAY_PASSWORD" flyway/flyway migrate

