const { query, findById } = require('../config/db');

const toExperience = (row) => {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    role: row.role,
    company: row.company,
    companyUrl: row.company_url || '',
    period: row.period || '',
    type: row.type || '',
    location: row.location || '',
    summary: row.summary || '',
    achievements: row.achievements || [],
    technologies: row.technologies || [],
    sortOrder: row.sort_order || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

const Experience = {
  async find() {
    const { rows } = await query('SELECT * FROM experiences ORDER BY sort_order ASC, created_at ASC');
    return rows.map(toExperience);
  },

  async findById(id) {
    return toExperience(await findById('experiences', id));
  },

  async create(data) {
    const { rows } = await query(
      `INSERT INTO experiences
         (role, company, company_url, period, type, location, summary, achievements, technologies, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        data.role,
        data.company,
        data.companyUrl || '',
        data.period || '',
        data.type || '',
        data.location || '',
        data.summary || '',
        data.achievements || [],
        data.technologies || [],
        Number(data.sortOrder) || 0,
      ]
    );
    return toExperience(rows[0]);
  },

  async update(id, data) {
    const current = await this.findById(id);
    if (!current) return null;
    const { rows } = await query(
      `UPDATE experiences SET
         role = $2,
         company = $3,
         company_url = $4,
         period = $5,
         type = $6,
         location = $7,
         summary = $8,
         achievements = $9,
         technologies = $10,
         sort_order = $11,
         updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [
        id,
        data.role ?? current.role,
        data.company ?? current.company,
        data.companyUrl ?? current.companyUrl,
        data.period ?? current.period,
        data.type ?? current.type,
        data.location ?? current.location,
        data.summary ?? current.summary,
        data.achievements ?? current.achievements,
        data.technologies ?? current.technologies,
        data.sortOrder !== undefined ? Number(data.sortOrder) || 0 : current.sortOrder,
      ]
    );
    return toExperience(rows[0]);
  },

  async remove(id) {
    const current = await this.findById(id);
    if (!current) return null;
    await query('DELETE FROM experiences WHERE id = $1', [id]);
    return current;
  },

  async removeAll() {
    await query('DELETE FROM experiences');
  },
};

module.exports = Experience;
