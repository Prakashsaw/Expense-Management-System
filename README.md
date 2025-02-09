# **Expense Management System**

## 🌐 GitHub Repo  
```bash
https://github.com/Prakashsaw/Expense-Management-System
```

## 🚀 Live Demo  
```bash
https://expense-management-system-prakash.netlify.app/
```

## 📌 Description  
The **Expense Management System** is a web-based application designed to help users efficiently track and manage their financial transactions.  
It provides features like user authentication, expense tracking, and data visualization to ensure a seamless budgeting experience.

### 🔹 Key Functionalities:  
- **User Authentication:** Secure login & registration with **email verification**.  
- **Password Security:** **Bcrypt** encryption for passwords and **JWT token-based authentication**.  
- **Password Recovery:** Forgot password functionality with email-based reset link.  
- **Expense Management:** Add, edit, delete, and categorize expenses with filtering options.  
- **Financial Insights:** View expenses **weekly, monthly, yearly**, and through **custom date ranges**.  
- **Data Analytics:** Expense visualization with **charts & graphs**.  

---

## 🛠 Tech Stack  

### **Frontend:**  
- React.js, Bootstrap, Ant Design, CSS  

### **Backend:**  
- Node.js, Express.js  

### **Database:**  
- MongoDB  

---

## ⚙️ Run Locally  

### **Step 1: Clone the project**  
```bash
git clone https://github.com/Prakashsaw/Expense-Management-System.git
```

### **Step 2: Navigate to the project directory**  
```bash
cd Expense-Management-System
```

### **Step 3: Install dependencies**  

#### Install dependencies for the frontend  
```bash
cd client/
npm install
```

#### Install dependencies for the backend  
```bash
cd server/
npm install
```

### **Step 4: Set up environment variables**  
Create a **.env** file inside the `server/` directory and add the following:  
```bash
MONGO_URL=
PORT=

BCRYPT_SALT=
JWT_SECRETE_KEY=
EXPIRE_IN=

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=

FAST2SMS_API_KEY=
```

### **Step 5: Start the application**  

#### Start the frontend  
```bash
// Open a new terminal
cd client
npm run start
```

#### Start the backend  
```bash
// Open a new terminal
cd server
npm run start
```

### **Step 6: Access the app**  
Once the setup is complete, the app will be running on your local system.  

---

## 🔥 Features  

- **🔒 Secure User Authentication:** Register, log in, and log out securely.  
- **📧 Email Verification:** Verify accounts via a confirmation link sent to the email.  
- **🔑 Password Management:** Forgot password functionality with email reset link.  
- **📝 User Profile Management:** Update profile details and change passwords after login.  
- **💰 Transaction Management:**  
  - Add, edit, and delete financial transactions with confirmation prompts.  
  - Categorize transactions into **income** or **expenses**.  
- **📊 Financial Overview:**  
  - View transaction history **weekly, monthly, and yearly**.  
  - Filter transactions by **custom date range**.  
  - Filter by **income, expenses, or both**.  
- **📈 Data Analytics:** Interactive **graphs & charts** for expense tracking.  

---

## 📸 Screenshots  

### **Authentication & User Management**  
| Feature | Screenshot |
|---------|-----------|
| **User Sign Up** | ![Sign Up](client/src/Images/3-signup.png) |
| **User Lofin** | ![Login Page](client/src/Images/2-login.png) |
| **Forgot Password** | ![Forgot Password](client/src/Images/14-forgot-password.png) |
| **User Profile Menu** | ![User Profile Menu](client/src/Images/11-see-menu-for-user-profile.png) | 
| **Update User Profile** | ![Update Profile](client/src/Images/12-update-profile.png) |
| **Change User Password** | ![Change Password](client/src/Images/13-change-password.png) |

### **Expense Management**
| Feature | Screenshot |
|---------|-----------|  
| **Expense Home Page** | ![Expense Homepage](client/src/Images/5-expense-homepage.png) |
| **Add Expense** | ![Add Expense](client/src/Images/6-add-expense.png) | 
| **Filter Expense** | ![Filter Expenses](client/src/Images/7-filter-expense.png) |
| **Edit and Update Expense** | ![Update Expense](client/src/Images/8-update-expense.png)  
| **Delete Expense Warning** | ![Delete Expense Warning](client/src/Images/10-delete-warning.png) |  
| **Expense Analytics** | ![Expense Analytics](client/src/Images/9-expense-amalytics.png) |

### **Contact Us**  
| Feature | Screenshot |
|---------|-----------|
| **Contact Us** | ![Contact Us](client/src/Images/4-contact-us.png) |
| **Copy Right** | ![Copy Right Footer](client/src/Images/15-copy-right.png) |

---

## 🛠 Made By  
- [@Prakashsaw](https://github.com/Prakashsaw)  

---

## 📝 License & Agreement  

### **License**  
This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this software as long as you include the original license.

### **Usage Agreement**  
By using this software, you agree to the following:  
- You will not use this project for any **illegal or unethical** activities.  
- If modified and redistributed, proper credit must be given to the original creator.  
- The software is provided **"as-is"**, without any guarantees of functionality or security.  

---

### **🌟 If you like this project, don't forget to star the repo!** ⭐  


<!-- # Expense Management System

## GitHub Repo Link: 
```bash 
  https://github.com/Prakashsaw/Expense-Management-System
```
## Live Demo URL: 
```bash 
  https://expense-management-system-prakash.netlify.app/
```

## Description
* Created a web-based expense management system to help users track and manage their financial transactions.
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

## Features 🚀  

- **User Registration & Login** with complete validation.  
- **Email Verification:** Users receive a confirmation link via email to verify their email address.  
- **Secure Authentication & Authorization** using JWT tokens.  
- **Forgot Password:** Users can reset their password if they forget it.  
- **Profile Management:** Users can update their profile details and change their password after logging in.  
- **Transaction Management:** Users can add, edit, and delete transactions with confirmation prompts.  
- **Financial Tracking:** Users can view transactions on a **weekly, monthly, and yearly basis** with filtering options.  
- **Custom Date Filtering:** Users can view transaction history by selecting specific date ranges.  
- **Category-Based Filtering:** Users can filter transactions by **income, expenses, or both**.  
- **Expense Analytics & Visualizations:** Users can analyze their expenses through **graphs and charts**.  

## Screenshots 📸
![Home Page](client/src/Images/1-home-page.png)
![Login Page](client/src/Images/2-login.png)
![Forgot Password](client/src/Images/14-forgot-password.png)
![Sign Up](client/src/Images/3-signup.png)
![Expense Homepage](client/src/Images/5-expense-homepage.png)
![Add Expense](client/src/Images/6-add-expense.png)
![Filter Expenses](client/src/Images/7-filter-expense.png)
![Update Expense](client/src/Images/8-update-expense.png)
![Expense Analytics](client/src/Images/9-expense-amalytics.png)
![Delete Expense Warning](client/src/Images/10-delete-warning.png)
![User Profile Menu](client/src/Images/11-see-menu-for-user-profile.png)
![Update User Profile](client/src/Images/12-update-profile.png)
![Chanage Password](client/src/Images/13-change-password.png)
![Contact Us](client/src/Images/4-contact-us.png)
![Copy Right Footer](client/src/Images/15-copy-right.png)

## Made By
- [@Prakashsaw](https://github.com/Prakashsaw) -->
