const { query, findById } = require('../config/db');

const toEnquiry = (row) => {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    createdAt: row.created_at,
  };
};

const Enquiry = {
  async find() {
    const { rows } = await query('SELECT * FROM enquiries ORDER BY created_at DESC');
    return rows.map(toEnquiry);
  },

  async findById(id) {
    return toEnquiry(await findById('enquiries', id));
  },

  async create({ name, email, message }) {
    const { rows } = await query(
      'INSERT INTO enquiries (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    return toEnquiry(rows[0]);
  },

  async remove(id) {
    const current = await this.findById(id);
    if (!current) return null;
    await query('DELETE FROM enquiries WHERE id = $1', [id]);
    return current;
  },
};

module.exports = Enquiry;
