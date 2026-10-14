const { query, findById } = require('../config/db');

const toSkill = (row) => {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    level: row.level || '',
    focus: row.focus || '',
    category: row.category,
    sortOrder: row.sort_order || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

const Skill = {
  async find() {
    const { rows } = await query('SELECT * FROM skills ORDER BY sort_order ASC, created_at ASC');
    return rows.map(toSkill);
  },

  async findById(id) {
    return toSkill(await findById('skills', id));
  },

  async create(data) {
    const { rows } = await query(
      `INSERT INTO skills (name, level, focus, category, sort_order)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [data.name, data.level || '', data.focus || '', data.category || 'frontend', Number(data.sortOrder) || 0]
    );
    return toSkill(rows[0]);
  },

  async update(id, data) {
    const current = await this.findById(id);
    if (!current) return null;
    const { rows } = await query(
      `UPDATE skills SET
         name = $2,
         level = $3,
         focus = $4,
         category = $5,
         sort_order = $6,
         updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [
        id,
        data.name ?? current.name,
        data.level ?? current.level,
        data.focus ?? current.focus,
        data.category ?? current.category,
        data.sortOrder !== undefined ? Number(data.sortOrder) || 0 : current.sortOrder,
      ]
    );
    return toSkill(rows[0]);
  },

  async remove(id) {
    const current = await this.findById(id);
    if (!current) return null;
    await query('DELETE FROM skills WHERE id = $1', [id]);
    return current;
  },

  async removeAll() {
    await query('DELETE FROM skills');
  },
};

module.exports = Skill;
