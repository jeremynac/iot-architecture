# iot-architecture

This project is emulating a smart greenhouse. It emulates several devices using flutter, react and nodejs. It deploys a thingsboard server to gather and display the data.

See more in [architecture](architecture.pdf)

# Installation

## Thingsboard server

- ```docker-compose up --build```
- Import the devices, rule chains and dashboards inside thingsboard

## Light sensor emulator

- Go to the [light sensor folder](./front_light_sensor)
- ```flutter run```

## Temperature sensor emulator

- Go to the [temperature sensor folder](./temp-and-humidity)
- ```npm install```
- ```npm start```

## Fluid sensor emulator

### Fluid sensor server

- Go to the [fluid sensor server folder](./fluid-sensor/server)
- ```node app.js```

### Fluid sensor web app

- Go to the [fluid sensor web app folder](./fluid-sensor/fluid-sensor)
- ```npm install```
- ```npm start```
