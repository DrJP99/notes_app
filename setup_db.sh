#! /bin/bash

source .env

psql postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT << EOF 
DROP DATABASE $DB_DATABASE;
CREATE DATABASE $DB_DATABASE;
\c $DB_DATABASE
\i ./Notes.session.sql
EOF