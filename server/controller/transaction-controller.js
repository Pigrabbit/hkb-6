const httpStatusCode = require("../utils/http-status-code");
const resMsg = require("../utils/response-message");

class TransactionController {
  constructor(transaction) {
    this.transaction = transaction;
  }

  async createTransaction(req, res, next) {
    try {
      const data = req.body;
      data.username = req.cookies.username;

      await this.transaction.create(data);

      res
        .status(httpStatusCode.CREATED)
        .json({ message: resMsg.TRANSACTION_CREATED });
    } catch (error) {
      next(error);
    }
  }

  async getTransactionByDate(req, res, next) {
    try {
      const date = req.params.date;
      const transactions = await this.transaction.findByDate(date);
      res.status(httpStatusCode.OK).json(transactions);
    } catch (error) {
      next(error);
    }
  }

  async patchTransaction(req, res, next) {
    try {
      const data = req.body;
      const t_id = req.params.t_id;
      await this.transaction.update(data, t_id);

      res
        .status(httpStatusCode.OK)
        .json({ message: resMsg.TRANSACTION_UPDATED });
    } catch (err) {
      next(err);
    }
  }

  async deleteTransaction(req, res, next) {
    try {
      const t_id = req.params.t_id;
      await this.transaction.delete(t_id);
      res
        .status(httpStatusCode.OK)
        .json({ message: resMsg.TRANSACTION_DELETED });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TransactionController;
