const transectionModel = require("../models/transectionModel");
const moment = require("moment");
const getAllTransection = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transections = await transectionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.user._id,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transections);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteTransection = async (req, res) => {
  try {
    await transectionModel.findOneAndDelete({ _id: req.body.transacationId });
    res.status(200).send("Transaction Deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const editTransection = async (req, res) => {
  const { amount, type, category, refrence, description, date } = req.body;
  const { transacationId } = req.body;
  try {
    await transectionModel.findOneAndUpdate(
      { _id: transacationId },
      // req.body.payload
      {
        $set: {
          userid: req.user._id,
          amount: amount,
          type: type,
          category: category,
          refrence: refrence,
          description: description,
          date: date,
        },
      }
    );
    res.status(200).send("Edit SUccessfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransection = async (req, res) => {
  const { amount, type, category, refrence, description, date } = req.body;
  try {
    // const newTransection = new transectionModel(req.body);
    const newTransection = new transectionModel({
      userid: req.user._id,
      amount: amount,
      type: type,
      category: category,
      refrence: refrence,
      description: description,
      date: date,
    });
    await newTransection.save();
    res.status(201).send("Transection Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTransection,
  addTransection,
  editTransection,
  deleteTransection,
};
