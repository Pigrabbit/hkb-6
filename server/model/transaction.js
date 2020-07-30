class Transaction {
  constructor(db) {
    this.db = db;
  }

  async create() {
    const conn = await this.db.getConnection();
    try {
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
  }
}
