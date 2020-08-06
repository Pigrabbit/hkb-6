const { OK } = require("../utils/http-status-code");

class StatisticsController {
  constructor(transaction) {
      this.transaction = transaction;
  }

  async getStatistcs(req, res, next) {
    try {
        const data = {
            user_id: res.locals.userId,
            date: req.params.date,
        }
        const transactions = await this.transaction.getOutcomeSumPerCategory(data);

        res.status(OK).json(transactions);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StatisticsController;
