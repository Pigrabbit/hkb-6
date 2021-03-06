const express = require("express");
const router = express.Router();

const db = require("../db");
const PaymentController = require("../controller/payment-controller");
const Payment = require("../model/payment");

const paymentModelInstance = new Payment(db);
const paymentControllerInstance = new PaymentController(paymentModelInstance);

router.get(
  "/",
  paymentControllerInstance.getUserPayments.bind(paymentControllerInstance)
);
router.post(
  "/",
  paymentControllerInstance.createPayment.bind(paymentControllerInstance)
);
router.delete(
  "/:p_id",
  paymentControllerInstance.deletePayment.bind(paymentControllerInstance)
);

module.exports = router;
