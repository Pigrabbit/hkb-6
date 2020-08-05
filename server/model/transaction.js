const { OUTCOME_TYPE, INCOME_TYPE } = require("../utils/contant");

class Transaction {
  constructor(db) {
    this.db = db;
  }

  async create(data) {
    const conn = await this.db.getConnection();
    try {
      await conn.beginTransaction();

      let {
        user_id,
        category,
        content,
        payment_name,
        amount,
        t_type,
        created_at,
      } = data;
      // 지출: 0, 수입: 1
      t_type = t_type === OUTCOME_TYPE ? 0 : 1;

      const getPaymentIdQuery =
        "SELECT id as payment_id FROM payment WHERE payment_name=?";
      const [rows] = await conn.query(getPaymentIdQuery, [payment_name]);
      const { payment_id } = rows[0];

      const insertTxQuery = `INSERT INTO transaction 
                (category, user_id, payment_id, amount, created_at, content, t_type) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

      await conn.query(insertTxQuery, [
        category,
        user_id,
        payment_id,
        amount,
        created_at,
        content,
        t_type,
      ]);
      await conn.commit();
    } catch (error) {
      conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  async findByDate(date) {
    const conn = await this.db.getConnection();
    try {
      await conn.beginTransaction();

      const [year, month] = date.split("-");
      const query = `SELECT * FROM transaction T
          JOIN payment P
          ON T.payment_id = P.id
          WHERE MONTH(created_at) = ? 
          AND YEAR(created_at) = ?
          ORDER BY created_at DESC`;

      const [rows] = await conn.query(query, [month, year]);
      if (rows.length === 0) return [];
      const { payment_id } = rows[0];

      const getPaymentNameQuery = "SELECT payment_name FROM payment WHERE id=?";
      const [paymentRows] = await conn.query(getPaymentNameQuery, [payment_id]);
      const { payment_name } = paymentRows[0];

      const tmp = rows.map((row) => {
        return {
          category: row.category,
          amount: row.amount,
          content: row.content,
          payment_name,
          created_at: row.created_at.toISOString().split("T")[0],
          t_type: `${row.t_type === 0 ? OUTCOME_TYPE : INCOME_TYPE}`,
        };
      });

      const transactionObjByDate = {};
      tmp.forEach((item) => {
        if (item.created_at in transactionObjByDate) {
          transactionObjByDate[item.created_at].push(item);
        } else {
          transactionObjByDate[item.created_at] = [item];
        }
      });

      await conn.commit();
      return transactionObjByDate;
    } catch (error) {
      conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  async update(data, t_id) {
    const conn = await this.db.getConnection();
    try {
      await conn.beginTransaction();

      let {
        category,
        content,
        payment_name,
        amount,
        t_type,
        created_at,
      } = data;
      t_type = t_type === outcome ? 0 : 1;

      //t_id에 해당하는 payment_id를 가져옵니다
      const getPaymentIdQuery = "SELECT payment_id FROM transaction WHERE id=?";

      const [rows] = await conn.query(getPaymentIdQuery, [t_id]);
      const { payment_id } = rows[0];
      console.log(payment_id);
      //payment table변경: 해당하는 payment_id의 payment_name을 변경합니다
      const updatePaymentNameQuery =
        "UPDATE payment SET payment_name=? where id=?";
      await conn.query(updatePaymentNameQuery, [payment_name, payment_id]);

      //transaction table변경
      const updateTxQuery =
        "UPDATE transaction SET category=?,amount=?,created_at=?,content=?,t_type=? WHERE id=?";

      await conn.query(updateTxQuery, [
        category,
        amount,
        created_at,
        content,
        t_type,
        t_id,
      ]);
      await conn.commit();
    } catch (error) {
      conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  async delete(t_id) {
    const conn = await this.db.getConnection();
    try {
      await conn.beginTransaction();
      const query = "DELETE FROM transaction where id=?";

      await conn.query(query, [t_id]);
      await conn.commit();
    } catch (error) {
      conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}

module.exports = Transaction;
