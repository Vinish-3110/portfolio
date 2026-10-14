const { query, findById } = require('../config/db');

const toProject = (row) => {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    title: row.title,
    description: row.description || [],
    techs: row.techs || [],
    links: {
      live: row.live_link || '',
      github: row.github_link || '',
      figma: row.figma_link || '',
    },
    showGithub: row.show_github !== false,
    image: row.image || '',
    isFeatured: row.is_featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

const asList = (value) => {
  if (Array.isArray(value)) return value.map((item) => String(item));
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map((item) => String(item));
    } catch {
      return value.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
    }
  }
  return [];
};

const Project = {
  async find() {
    const { rows } = await query('SELECT * FROM projects ORDER BY created_at DESC');
    return rows.map(toProject);
  },

  async findById(id) {
    return toProject(await findById('projects', id));
  },

  async create(data) {
    const links = data.links || {};
    const { rows } = await query(
      `INSERT INTO projects (title, description, techs, live_link, github_link, show_github, figma_link, image, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        data.title,
        asList(data.description),
        asList(data.techs),
        data.live_link ?? links.live ?? '',
        data.github_link ?? links.github ?? '',
        data.showGithub !== undefined ? Boolean(data.showGithub) : data.show_github !== false,
        data.figma_link ?? links.figma ?? '',
        data.image || '',
        Boolean(data.isFeatured ?? data.is_featured),
      ]
    );
    return toProject(rows[0]);
  },

  async update(id, data) {
    const current = await this.findById(id);
    if (!current) return null;
    const links = data.links || current.links || {};
    const { rows } = await query(
      `UPDATE projects SET
         title = $2,
         description = $3,
         techs = $4,
         live_link = $5,
         github_link = $6,
         show_github = $7,
         figma_link = $8,
         image = $9,
         is_featured = $10,
         updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [
        id,
        data.title ?? current.title,
        data.description !== undefined ? asList(data.description) : current.description,
        data.techs !== undefined ? asList(data.techs) : current.techs,
        data.live_link !== undefined ? data.live_link : links.live,
        data.github_link !== undefined ? data.github_link : links.github,
        data.showGithub !== undefined ? Boolean(data.showGithub) : current.showGithub !== false,
        data.figma_link !== undefined ? data.figma_link : links.figma,
        data.image !== undefined ? data.image : current.image,
        data.isFeatured !== undefined ? Boolean(data.isFeatured) : current.isFeatured,
      ]
    );
    return toProject(rows[0]);
  },

  async remove(id) {
    const current = await this.findById(id);
    if (!current) return null;
    await query('DELETE FROM projects WHERE id = $1', [id]);
    return current;
  },

  async removeAll() {
    await query('DELETE FROM projects');
  },
};

module.exports = Project;
