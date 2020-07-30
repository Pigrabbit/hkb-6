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

  async findByDate(date) {
    const conn = await this.db.getConnection();
    try {
      await conn.beginTransaction();

      const [ year, month ] = date.split("_");
      const query = `SELECT * FROM transaction T
          JOIN payment P
          ON T.payment_id = P.id
          WHERE MONTH(created_at) = ? 
          AND YEAR(created_at) = ?
          ORDER BY created_at DESC`;

      const [rows] = await conn.query(query, [month, year]);
      const { payment_id } = rows[0];

      const getPaymentNameQuery = "SELECT payment_name FROM payment WHERE id=?";
      const [ paymentRows ] = await conn.query(getPaymentNameQuery, [ payment_id ]);
      const { payment_name } = paymentRows[0];

      const tmp = rows.map(row => {
        return {
          category: row.category,
          amount: row.amount,
          content: row.content,
          payment_name,
          created_at: row.created_at.toISOString().split("T")[0],
          t_type: `${(row.t_type === 0) ? "지출" : "수입"}`
        };
      });

      const transactionObjByDate = {};
      tmp.forEach(item => {
        if (item.created_at in transactionObjByDate) {
          transactionObjByDate[item.created_at].push(item);
        } else {
          transactionObjByDate[item.created_at] = [ item ];
        }
      })

      await conn.commit();
      return transactionObjByDate;
    } catch (error) {
      conn.rollback();
      throw error
    } finally {
      conn.release();
    }
  }
}

module.exports = Transaction;
