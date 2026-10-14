const { query } = require('../config/db');

const PUBLIC_COLUMNS = `
  id, resume_url, resume_filename, resume_mimetype, theme_color, owner_email,
  display_name, availability, role_badge, headline_before, headline_highlight, headline_after,
  hero_description, about_heading, about_paragraphs, stats, email, phone, linkedin, github,
  engineer_name, discipline, experience_label, core_focus, site_settings
`;

const toProfile = (row) => {
  if (!row) return null;
  return {
    ...row,
    _id: row.id,
    id: row.id,
    about_paragraphs: row.about_paragraphs || undefined,
    stats: row.stats || undefined,
  };
};

const Profile = {
  async findOne() {
    const { rows } = await query(`SELECT ${PUBLIC_COLUMNS} FROM profiles ORDER BY created_at ASC LIMIT 1`);
    return toProfile(rows[0]);
  },

  async findWithResume() {
    const { rows } = await query(
      `SELECT ${PUBLIC_COLUMNS}, resume_data FROM profiles ORDER BY created_at ASC LIMIT 1`
    );
    return toProfile(rows[0]);
  },

  async create(data = {}) {
    const { rows } = await query(
      `INSERT INTO profiles (owner_email, theme_color)
       VALUES ($1, $2)
       ON CONFLICT (owner_email) DO UPDATE SET updated_at = NOW()
       RETURNING ${PUBLIC_COLUMNS}`,
      [data.owner_email || 'admin@portfolio.com', data.theme_color || '#b87af0']
    );
    return toProfile(rows[0]);
  },

  async save(profile) {
    const resumeData = Buffer.isBuffer(profile.resume_data) ? profile.resume_data : null;
    const { rows } = await query(
      `UPDATE profiles SET
         resume_url = $2,
         resume_filename = $3,
         resume_mimetype = $4,
         resume_data = COALESCE($5, resume_data),
         theme_color = $6,
         display_name = $7,
         availability = $8,
         role_badge = $9,
         headline_before = $10,
         headline_highlight = $11,
         headline_after = $12,
         hero_description = $13,
         about_heading = $14,
         about_paragraphs = $15,
         stats = $16::jsonb,
         email = $17,
         phone = $18,
         linkedin = $19,
         github = $20,
         engineer_name = $21,
         discipline = $22,
         experience_label = $23,
         core_focus = $24,
         site_settings = $25::jsonb,
         updated_at = NOW()
       WHERE id = $1
       RETURNING ${PUBLIC_COLUMNS}`,
      [
        profile.id,
        profile.resume_url || null,
        profile.resume_filename || null,
        profile.resume_mimetype || null,
        resumeData,
        profile.theme_color || null,
        profile.display_name || null,
        profile.availability || null,
        profile.role_badge || null,
        profile.headline_before || null,
        profile.headline_highlight || null,
        profile.headline_after || null,
        profile.hero_description || null,
        profile.about_heading || null,
        profile.about_paragraphs?.length ? profile.about_paragraphs : null,
        profile.stats ? JSON.stringify(profile.stats) : null,
        profile.email || null,
        profile.phone || null,
        profile.linkedin || null,
        profile.github || null,
        profile.engineer_name || null,
        profile.discipline || null,
        profile.experience_label || null,
        profile.core_focus || null,
        profile.site_settings ? JSON.stringify(profile.site_settings) : null,
      ]
    );
    return toProfile(rows[0]);
  },
};

module.exports = Profile;
