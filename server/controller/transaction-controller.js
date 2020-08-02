class TransactionController {
  constructor(transaction) {
    this.transaction = transaction;
  }

  async createTransaction(req, res, next) {
    try {
      const data = req.body;
      data.username = req.cookies.username;

      await this.transaction.create(data);

      res.status(201).json({ message: "transaction successfully created" });
    } catch (error) {
      next(error);
    }
  }

  async getTransactionByDate(req, res, next) {
    try {
      const date = req.params.date;
      const transactions = await this.transaction.findByDate(date);

      res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }

  async patchTransaction(req, res, next) {
    try {
      const data = req.body;
      const t_id = req.params.t_id;

      await this.transaction.update(data, t_id);

      res.status(200).json({ message: "transaction successfully updated" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TransactionController;
