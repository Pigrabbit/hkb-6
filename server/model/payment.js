class Payment {
  constructor(db) {
    this.db = db;
  }
  
  async findByUserId(id) {
    const conn = await this.db.getConnection();
    try {
      const query = "select id as payment_id, payment_name from payment where user_id=?";
      const [rows] = await conn.query(query, [id]);
      return rows;
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
  }

  async create(payment_name) {
    const conn = await this.db.getConnection();
    try {
      await conn.beginTransaction();

      const insertPaymentQuery = `INSERT INTO payment
              (payment_name,user_id) 
              VALUES (?, ?)`;

      await conn.query(insertPaymentQuery, [payment_name, 1]);
      await conn.commit();
    } catch (error) {
      conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  async deleteById(p_id) {
    const conn = await this.db.getConnection();
    try {
      await conn.beginTransaction();

      const deletePaymentQuery = `DELETE FROM payment
              WHERE id=?`;

      await conn.query(deletePaymentQuery, [p_id]);
      await conn.commit();
    } catch (error) {
      conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}

module.exports = Payment;
