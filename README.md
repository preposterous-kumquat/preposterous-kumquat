# Lensity

Finding connection with a human lens

## Team

  - __Product Owner__: [Josphine Eng](https://github.com/ChirpingMermaid)
  - __Scrum Master__: [Julie Truong](https://github.com/Truong-Julie)
  - __Development Team Members__: [Brian Kilrain](https://github.com/bkilrain)

## Table of Contents
1. [Micro-Services](#micro-services)
1. [Requirements](#requirements)
1. [Usage](#usage)
1. [Docker Development](#docker-development)
    1. [Build Image](#build-image)
    1. [Launch Docker Container](#launch-docker-container)
    1. [Train Corpus](#train-corpus)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Compile React](#compile-react)
    1. [Seed Database Data](#seed-database-data)
    1. [Train Data](#train-data)
1. [Team](#team)
1. [Contributing](#contributing)


## Micro-Services
  - 
[Photo-Processor](https://github.com/preposterous-kumquat/photoProcessing)
  - 
[Curator](https://github.com/preposterous-kumquat/curator)
  - 
[Similarity Server](https://github.com/preposterous-kumquat/similarityServer)

## Requirements

- Node 0.10.x
- Postgresql 6.1.x
- Webpack 1.13.x

## Usage

- POST /upload
Request to upload a photo

- GET /photos
Request to get all of users photos

- GET /stacks
Request to get stacks from curator micro-service

- POST /createPair 
Create a pair in the postgreSQL database

- GET /getPairs
Request to get the 5 most recently created pairs

- GET /getRandStacks
Request to curator to grab the 6 most recently created stacks for community view

## Docker Development

### Build Image

In root folder run:
```sh
docker build -t app .
```
### Launch Docker Container
```sh
docker-compose up
```
### Train Corpus 
- Use Postman to send POST request to
``` http://0.0.0.0:5000/train ```


## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```
### Compile React

From within the root directory run webpack:

```sh
webpack -watch
```

### Seed Database Data

From db/seeds directory:

Make sure postgres is running
Drop database and create empty database

```sh
drop database app;
// DROP DATABASE
create database app;
// CREATE DATABASE
```
Restart main server

Run seed.js using node
```sh
run node seeds.js
```

email: kumquat@gmail.com
pw: 123
* If pushing to redis server, uncomment out the redis line. Note* this has not been tested.

### Train Data
- Upload training photos to S3
 * naming convention: http://url.com/path/to/photo/im1342.jpg... im1343.jpg... im1344.jpg
- In curator/routes.js -> set training counter to first image file number (line 16)
- Uncomment volume to trainingCorpus.json in yml file
- Send POST request to main-web-server/kickoffTraining with postman
- Copy and paste data in trainingCorpus.json in curator to trainingCorpus.json in simserver

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
