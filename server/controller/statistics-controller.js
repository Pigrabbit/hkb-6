class StatisticsController {
  constructor(transaction) {
      this.transaction = transaction;
  }

  async getStatistcs(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StatisticsController;
