class Transaction {
  constructor(db) {
    this.db = db;
  }

  async create(data) {
    const conn = await this.db.getConnection();
    try {
        await conn.beginTransaction();

        let { username, category, content, payment_name, amount, t_type, created_at } = data;
        // 지출: 0, 수입: 1
        t_type = (t_type === "지출") ? 0 : 1;

        const getUserIdQuery = "SELECT id as user_id FROM user WHERE username=?";
        let [rows] = await conn.query(getUserIdQuery, [ username ]);
        const { user_id } = rows[0];
        
        const getPaymentIdQuery = "SELECT id as payment_id FROM payment WHERE payment_name=?";
        [rows] = await conn.query(getPaymentIdQuery, [ payment_name ]);
        const { payment_id } = rows[0];

        const insertTxQuery = `INSERT INTO transaction 
                (category, user_id, payment_id, amount, created_at, content, t_type) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

        await conn.query(insertTxQuery, [ category, user_id, payment_id, amount, created_at, content, t_type]);
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
