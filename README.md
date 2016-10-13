# Lensity

> Finding connection with a human lens

## Team

  - __Product Owner__: Josphine Eng
  - __Scrum Master__: Julie Truong
  - __Development Team Members__: Brian Kilrain

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Compile React](#compile-react)
    1. [Seed Database Data](#seed-database-data)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x
- Postgresql 6.1.x

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

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
