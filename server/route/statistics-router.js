const express = require("express");
const router = express.Router();

const db = require("../db");
const StatisticsController = require("../controller/statistics-controller");
const Transaction = require("../model/transaction");

const transactionModelInstance = new Transaction(db);
const statisticsControllerInstance = new StatisticsController(
  transactionModelInstance
);

// data 로는
// year, month와
// 차트 종류: pie, bar, line 이 전달된다.
router.get(
  "/:data",
  statisticsControllerInstance.getStatistcs.bind(statisticsControllerInstance)
);

module.exports = router;
