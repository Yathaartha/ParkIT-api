# Node.js Server with Express, Sequelize, and Docker

This is a sample README file for a Node.js server built with Express, Sequelize, and Docker. It provides an overview of the project, installation instructions, and other relevant information.

## Table of Contents

- [Project Description](#project-description)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Project Description

This project is a Node.js server built using the Express framework and utilizes Sequelize as the ORM (Object-Relational Mapping) library for working with databases. The server is designed to provide a foundation for building RESTful APIs or web applications. It works as the server for a [smart parking application](https://github.com/Yathaartha/ParkIT-app/)

## Requirements

To run this server, you need to have the following software installed:

- Node.js (version 12 or higher)
- yarn (Node Package Manager)
- Docker (for running the server in a Docker container)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Yathaartha/ParkIT-api
   ```

2. Navigate to the project's directory:

   ```bash
   cd ParkIT-api
   ```

3. Install the dependencies using npm:

   ```bash
   yarn
   ```

4. Create .env file in the root directory and copy the contents of .env.example to it. Replace the values with your own.

## Usage

To start the server, run the following command:

```bash
yarn start
```

The server will start running on `http://localhost:7000`. You can access the API endpoints or build your web application on top of this server.

## Docker

Follow these steps to run the docker containers:

1. Run the Docker containers:

   ```bash
   docker compose up -d
   ```

The database will be accessible at `http://localhost:8080` and metabase will be accessible at `http://localhost:4005` from within the Docker container and on your host machine.

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the repository.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and use it as per your needs.
