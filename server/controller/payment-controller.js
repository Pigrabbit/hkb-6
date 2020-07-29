class PaymentController {
    constructor() {

    }

    getAllPayment(req, res, next) {
        const result = [
            {payment_name: "우리카드"},
            {payment_name: "카카오체크카드"},
            {payment_name: "국민은행"},
        ];

        res.json(result);
    }
}

module.exports = PaymentController;
