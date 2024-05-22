#! /bin/bash

function yes_or_no {
    while true; do
        read -p "$* [y/n]: " yn
        case $yn in
            [Yy]*) return 0  ;;  
            [Nn]*) echo "Aborted" ; return  1 ;;
        esac
    done
}

yes_or_no "Do you want to setup the DB? (This will DROP the database and create it from scratch)" && ./setup_db.sh

# install dependencies
cd frontend
npm install

cd ../backend
npm install

cd ..

# start services
cd frontend 
npm start&
cd ../backend
npm start&

wait