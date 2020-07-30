class Payment {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const conn = await this.db.getConnection();
    try {
      const query = "elect payment_name from payment";
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
