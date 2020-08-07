const { DELETE_BINARY_VALUE } = require("../utils/contant");

class Payment {
  constructor(db) {
    this.db = db;
  }

  async findByUserId(id) {
    const conn = await this.db.getConnection();
    try {
      const query = "select id as payment_id, payment_name from payment where user_id=? and is_deleted=0";
      const [rows] = await conn.query(query, [id]);
      if(rows.length === 0) return [];

      return rows;
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
  }

  async create(data) {
    const conn = await this.db.getConnection();
    try {
      await conn.beginTransaction();
      const { payment_name , user_id} = data;
      const insertPaymentQuery = `INSERT INTO payment
              (payment_name,user_id) 
              VALUES (?, ?)`;

      await conn.query(insertPaymentQuery, [payment_name, user_id]);
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
      const deletePaymentQuery = "UPDATE payment SET is_deleted=? WHERE id=?";

      await conn.query(deletePaymentQuery, [DELETE_BINARY_VALUE, p_id]);
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
  }
}

module.exports = Payment;
