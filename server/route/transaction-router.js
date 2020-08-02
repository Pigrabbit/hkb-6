const express = require("express");
const router = express.Router();

const db = require("../db");
const TransactionController = require("../controller/transaction-controller");
const Transaction = require("../model/transaction");

const transactionModelInstance = new Transaction(db);
const transactionControllerInstance = new TransactionController(
  transactionModelInstance
);

router.post(
  "/",
  transactionControllerInstance.createTransaction.bind(
    transactionControllerInstance
  )
);

router.get(
  "/:date",
  transactionControllerInstance.getTransactionByDate.bind(
    transactionControllerInstance
  )
);

// TODO: update
router.patch(
  "/:t_id",
  transactionControllerInstance.patchTransaction.bind(
    transactionControllerInstance
  )
);

// TODO: delete
router.delete("/:t_id");

module.exports = router;
