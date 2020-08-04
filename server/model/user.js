class User {
  constructor(db, { username, google_id }) {
    this.db = db;
    this.username = username;
    this.google_id = google_id;
  }

  async findByGoogleId() {}

  async create() {
    const conn = await this.db.getConnection();
    try {
      const query = "INSERT INTO user (username, google_id) VALUES (?, ?)";
      await conn.query(query, [this.username, this.google_id]);
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
  }
}

module.exports = User;
