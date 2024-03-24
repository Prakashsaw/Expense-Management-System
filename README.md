# Expense Management System

## Description
* Create a web-based expense management system to help users track and manage their financial
transactions.


## Tech Stack

**Frontend:** React.js, Bootstrap, Ant Design, css

**Backend:** Node.js, Express.js

**Database:** MongoDB



## Run Locally

**Step:1-** Clone the project

```bash
  git clone https://github.com/Prakashsaw/Real-Time-Chat-App.git
```

**Step:2-** Go to the project directory

```bash
  cd Real-Time-Chat-App
```

**Step:3-** Install dependencies in all folders like client, server and socket one by one

* Installl dependencies for client
```bash
  cd client/
  npm install
```
* Installl dependencies for server
```bash
  cd server/
  npm install
```
* Installl dependencies for socket
```bash
  cd socket/
  npm install
```

**Step:4-** Make .env file in server folder which contain yours development database keys of MongoDB and JWT secrete key
```bash
  ATLAS_URI = 
  JWT_SECRET_KEY =
```

**Step:5-** Start these all three client, server and socket in three seperate terminals

* Start the client
```bash
  //open new terminal
  cd client
  npm run dev
```

* Start the server
```bash
  //open new terminal
  cd server
  nodemon index.js
```
* Start the socket
```bash
  //open new terminal
  cd socket
  nodemon index.js
```

**Step:6-** Now your Chatting app is running in your local host.

## Features

#### Login/Registration

#### Authenticaton

#### Real Time Chatting with Typing indicators

#### Active users Indicator (when user is online)

#### One to One chat

#### Create Group Chats

#### Notifications icon

#### Add or Remove users from group


## Made By
- [@Prakashsaw](https://github.com/Prakashsaw)
