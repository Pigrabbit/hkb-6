const db = require("../db");

class Payment {
  constructor() {}

  async findAll() {
    const conn = await db.getConnection();
    try {
      const query = "select payment_name from payment";
      const [rows] = await conn.query(query);

      return rows;
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
  }

  // create() {}
  // findById() {}
  // removeById() {}
}

module.exports = Payment;