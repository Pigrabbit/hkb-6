class TransactionController {
  constructor(transaction) {
    this.transaction = transaction;
  }

  async createTransaction(req, res, next) {
    try {
      const data = req.body;
      data.username = req.cookies.username;

      await this.transaction.create(data);

      res.status(201).json({ message: "transaction successfully created"});
    } catch (error) {
      next(error);
    }
  }

  async getTxByYearMonth(req, res, next) {
    try {
      
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionController;
