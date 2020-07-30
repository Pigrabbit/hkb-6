class PaymentController {
    constructor(payment) {
        this.payment = payment;
    }

    async getAllPayment(req, res, next) {
        const result = await this.payment.findAll();
        
        res.json(result);
    }
}

module.exports = PaymentController;
