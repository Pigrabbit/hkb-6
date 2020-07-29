const express = require('express');
const router = express.Router();
const PaymentController = require("../controller/payment-controller");

const paymentControllerInstance = new PaymentController();

router.get("/", paymentControllerInstance.getAllPayment);
router.post("/", );
router.delete("/:p_id", );

module.exports = router;
