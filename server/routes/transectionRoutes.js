const express = require("express");
const {
  addTransection,
  getAllTransection,
  editTransection,
  deleteTransection,
} = require("../controllers/transactionController");
const checkUserAuth = require("../middleware/userAuth");

//router object
const router = express.Router();

//routes
//add transection POST Method
router.post("/add-transection", checkUserAuth, addTransection);
//Edit transection POST Method
router.post("/edit-transection", checkUserAuth, editTransection);
//Delete transection POST Method
router.post("/delete-transection", checkUserAuth, deleteTransection);

//Get all transections
router.post("/get-transection", checkUserAuth, getAllTransection);

module.exports = router;
