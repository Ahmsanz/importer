### Description
This is a small app with two independent microservices connected to the same MongoDB database:
- **post**: accepts POST requests with the _emissions_ **csv file** that will be parsed, allowing every row in the table to be saved as a separate document into the database.
- **get**: retrieves the data from that same database, accepting different query parameters:
    - sector: will search for coincidences of the text being sent with the _sector_ field in the documents, filtering the data.
    - country: same with the _country_ field.
    - year: will show only the requested year value in the _series_ object.
    - from: lower limit of the _series_ object.
    - to: upper limit for the _series_ object.
    - limit: will set how many documents will be provided.
    - page: combined with the previous, allows to paginate the result.


### How to start
For anyone wanting to run the app, only a few things will be needed.

#### Technical requirements
 - Docker
 - Docker-compose
 - MongoDB
 - Node

#### How to run it separately
Both microservices are independent and able to run on its own as long as a MongoDB database is running locally. To do so, just run the following commands after accessing the microservice:
```bash
$ npm install
$ npm run start
```
**Please note that, in order to run them locally you will need to point to _localhost_ in the app.module.ts. Otherwise, you will get a connection error.**

#### How to run the whole application
The main goal is to have access to both endpoints, being connected to a shared database. That is possible by running the command 
```bash
$ docker-compose up
```
The docker containers and images for both microservices and the database will be built, the dependencies will be installed and the app will be started, giving access to the whole thing.