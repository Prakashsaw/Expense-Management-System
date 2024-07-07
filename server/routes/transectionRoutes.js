const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
  getOneTransaction,
} = require("../controllers/transactionController");
const checkUserAuth = require("../middleware/userAuth");

//router object
const router = express.Router();

//routes
//Get all transections
router.post("/get-transection", checkUserAuth, getAllTransaction);

// Get one transection
router.get("/get-one-transection/:transactionId", checkUserAuth, getOneTransaction);

//add transection POST Method
router.post("/add-transection", checkUserAuth, addTransaction);

//Edit transection POST Method
router.post("/edit-transection/:transactionId", checkUserAuth, editTransaction);

//Delete transection POST Method
router.post(
  "/delete-transection/:transactionId",
  checkUserAuth,
  deleteTransaction
);

module.exports = router;
