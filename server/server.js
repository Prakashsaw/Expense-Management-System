const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");

const connectDB = require("./config/connectDB");
// config dot env file
dotenv.config();

//databse call
connectDB();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// // setup session
// app.use(
//   session({
//     secret: "MY SECRETE KEY",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// // passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

//routes
//user routes
app.use("/api/v1/users", require("./routes/userRoute"));
//transections routes
app.use("/api/v1/transections", require("./routes/transectionRoutes"));

//port
const PORT = 8080 || process.env.PORT;

//it is a test route just to see our server is working
app.get("/", (req, res) => {
  return res.send(`<div style = "background:green;padding:100px;"><h2>Welcome to Expense Management System Backend Server URL...</h2>
    <p>Below are the some examples of supported routes...</p>
        <div><ul>
            <h3>User Route</h3>
            <li>Register User - /api/v1/users/register</li>
            <li>Login User - /api/v1/users/login</li>
            <h3>Transection Route</h3>
            <li>Transaction Route - /api/v1/transections</li>
            <li>Much more...</li>
        </ul></div>
    </div>`);
});

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
