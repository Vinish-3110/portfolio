const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const databaseUrl = () => {
  const direct = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (direct) return direct;

  const host = process.env.POSTGRES_HOST;
  const user = process.env.POSTGRES_USER;
  const database = process.env.POSTGRES_DB;
  if (!host || !user || !database) return '';

  const password = encodeURIComponent(process.env.POSTGRES_PASSWORD || '');
  const port = process.env.POSTGRES_PORT || '5432';
  return `postgresql://${encodeURIComponent(user)}:${password}@${host}:${port}/${database}`;
};

const connectionString = databaseUrl();

if (!/^postgres(ql)?:\/\//.test(connectionString)) {
  throw new Error(
    'Set DATABASE_URL to the internal Postgres URL from Dokploy. This app does not run its own database.'
  );
}

const pool = new Pool({ connectionString });

const query = (text, params) => pool.query(text, params);

const SCHEMA = `
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT[] NOT NULL DEFAULT '{}',
  techs TEXT[] NOT NULL DEFAULT '{}',
  live_link TEXT,
  github_link TEXT,
  figma_link TEXT,
  image TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  company_url TEXT,
  period TEXT,
  type TEXT,
  location TEXT,
  summary TEXT,
  achievements TEXT[] NOT NULL DEFAULT '{}',
  technologies TEXT[] NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  level TEXT,
  focus TEXT,
  category TEXT NOT NULL DEFAULT 'frontend',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hashed_ip TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Unknown',
  city TEXT NOT NULL DEFAULT 'Unknown',
  user_agent TEXT NOT NULL DEFAULT '',
  path TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS visitors_created_at_idx ON visitors (created_at DESC);
CREATE INDEX IF NOT EXISTS visitors_hashed_ip_created_at_idx ON visitors (hashed_ip, created_at DESC);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_url TEXT,
  resume_filename TEXT,
  resume_mimetype TEXT,
  resume_data BYTEA,
  theme_color TEXT DEFAULT '#b87af0',
  owner_email TEXT UNIQUE DEFAULT 'admin@portfolio.com',
  display_name TEXT,
  availability TEXT,
  role_badge TEXT,
  headline_before TEXT,
  headline_highlight TEXT,
  headline_after TEXT,
  hero_description TEXT,
  about_heading TEXT,
  about_paragraphs TEXT[],
  stats JSONB,
  email TEXT,
  phone TEXT,
  linkedin TEXT,
  github TEXT,
  engineer_name TEXT,
  discipline TEXT,
  experience_label TEXT,
  core_focus TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

const connectDB = async () => {
  await pool.query('SELECT 1');
  await pool.query(SCHEMA);
  console.log('PostgreSQL connected');
};

const findById = async (table, id, columns = '*') => {
  try {
    const { rows } = await query(`SELECT ${columns} FROM ${table} WHERE id = $1`, [id]);
    return rows[0] || null;
  } catch (error) {
    if (error.code === '22P02') return null;
    throw error;
  }
};

module.exports = { pool, query, connectDB, findById };
