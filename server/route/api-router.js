const express = require('express');
const router = express.Router();

const transactionRouter = require("./transaction-router");
const paymentRouter = require("./payment-router");
const statisticsRouter = require("./statistics-router");

router.use('/transaction', transactionRouter);
router.use("/payment", paymentRouter);
router.use("/statistics", statisticsRouter);

module.exports = router;
