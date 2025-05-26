# Hello! This is Max Magnussonthe instructions to boot up this project!
1. Make sure docker desktop is installed on your computer
2. To start the project, download the zip file and open it in your code editor
3. To start frontend run theese commands in the terminal
   - "cd frontend"
   - "npm install"
   - "npm start"
4. To start backend. Make sure you are in the root file, then run this command:
   - "./mvnw spring-boot:run"
5. Frontend should now be running on localhost:3000/rent and localhost:3000/admin
6. Unfortunately the tables for the database are not created automatically. To create them, choose the rental-postgres container in dockerdesktop and start it
7. Run this command
   - docker exec "-it rental-postgres psql -U my_user -d rental" (if password is needed anywhere in this process its: "password123" (right click in the terminal to paste)
8. You should now be inside the container, then run the following commands
   - "CREATE TABLE car (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price_per_day INTEGER NOT NULL
);"
-  "CREATE TABLE rental (
    id SERIAL PRIMARY KEY,
    car_id INTEGER REFERENCES car(id),
    driver_name VARCHAR(100) NOT NULL,
    personal_number VARCHAR(20) NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    revenue INTEGER
);"
- "INSERT INTO car (name, price_per_day) VALUES
('Volvo S60', 1500),
('Volkswagen Golf', 1333),
('Ford Mustang', 3000),
('Ford Transit', 2400);"

9. Everything should now work. Enyoy. Best regards Max Magnusson
   
# Car Rental bootstrap project

This minimal bootstrap project contains a React UI and a backend powered by Spring, connected to a PostgreSQL database.
Before you start the project make sure you have Maven, Java 17, Docker ( for easy setup of database ), Node 16 LTS and NPM installed. 

You will be able to see the text "Hello world!" in the UI if you successfully manage to start the backend, frontend and the database. You are not supposed to use the "hello world" code, its only purpose is to verify that you have everything up and running correctly. 

## How to start the project

#### 1. Set up the database
You may start a database with the following docker command based on the [Bitnami PostgreSQL Image](https://hub.docker.com/r/bitnami/postgresql/):

`docker run --name postgresql -p 5432:5432 -e POSTGRESQL_USERNAME=my_user -e POSTGRESQL_PASSWORD=password123 -e POSTGRESQL_DATABASE=rental bitnami/postgresql:latest`


#### 2. Start the backend 
The backend was bootstrapped with [Spring initializr](https://start.spring.io/) and is configured to run against a PostgreSQL database.

Start the backend by running  `com.example.rental.RentalApplication#main`.


#### 3. Start the frontend
The frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

See `package.json` for npm commands. The `package.json` has a proxy for the backend hosted at `http://localhost:8080`.

Start the frontend by doing `npm install` followed by `npm start` in the `frontend` folder




