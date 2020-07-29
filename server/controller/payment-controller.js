const Payment = require("../model/payment")

class PaymentController {
    constructor() {

    }

    async getAllPayment(req, res, next) {
        const paymentInstance = new Payment();
        const result = await paymentInstance.findAll();
        
        res.json(result);
    }
}

module.exports = PaymentController;
