# Expense Management System

## Description
* Create a web-based expense management system to help users track and manage their financial transactions.
* User Login and SignUp functionality with full validation(email validation through sending email), bcrypt passsword in backend, JWT token for secure user authentication.
* Feature of forgot password with sending email for reset password link using nodemailer.
* Record and categorize expenses on weekly, monthly and yearly, Expense analytics and visualizations in graphs and charts, user can edit and delete transactions.


## Tech Stack

**Frontend:** React.js, Bootstrap, Ant Design, CSS.

**Backend:** Node.js, Express.js.

**Database:** MongoDB.



## Run Locally

**Step:1-** Clone the project

```bash
  git clone https://github.com/Prakashsaw/Expense-Management-System.git
```

**Step:2-** Go to the project directory

```bash
  cd Expense-Management-System
```

**Step:3-** Install all the dependencies in client and server folders one by one.

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

**Step:4-** Make .env file in your server folder which will contain all your development environment variables with private keys
```bash
  MONGO_URL =
  PORT =
  BCRYPT_SALT =
  JWT_SECRETE_KEY =
  EXPIRE_IN =

  EMAIL_HOST =
  EMAIL_PORT =
  EMAIL_USER =
  EMAIL_PASS =
  EMAIL_FROM =

  FAST2SMS_API_KEY =
```

**Step:5-** Start client and server in seperate two terminal

* Start the client
```bash
  //open new terminal
  cd client
  npm run start
```

* Start the server
```bash
  //open new terminal
  cd server
  npm run start
```

**Step:6-** Now Expense Management System App is running in your local system.

## Features

#### Login and Registration with full user validation.

#### Validate user email with sending email for confirmation you email with link then user email have been verified.

#### User authentication and authorization using JWT token for secure user authentication.

#### Forgot password features when user don't remember their password.

#### User can Update their profile details after loggedin and also able to change the password.

#### User can add their transaction, edit transaction, delete transaction with confirmmation.

#### User can view their finantial transaction in weekly, monthly and yealy basis (filterration).

#### User can view transaction history by selecting custom dates.

#### User can filter their transaction by category like by all expense, all expenses and both income and expenses.

#### User can vier expenses analytics and visualizations in graphs and charts.


## Made By
- [@Prakashsaw](https://github.com/Prakashsaw)
