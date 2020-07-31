class PaymentController {
  constructor(payment) {
    this.payment = payment;
  }

  async getAllPayment(req, res, next) {
    try {
      const result = await this.payment.findAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PaymentController;
