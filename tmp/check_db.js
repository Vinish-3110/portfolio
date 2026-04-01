const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('../backend/models/Project');

dotenv.config({ path: '../backend/.env' });

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'Portfolio' });
    const projects = await Project.find({});
    console.log('Project count:', projects.length);
    console.log('Projects:', JSON.stringify(projects, null, 2));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

check();
