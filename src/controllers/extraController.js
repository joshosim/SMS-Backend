const Project = require('../models/extraModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const addProject = async (req, res) => {

  const {
    title,
    desc,
    link,
    image,   // base64 string or URL
    tools,   // array OR comma‑separated string
  } = req.body;

  const required = { title, desc, link, image, tools };
  const emptyFields = Object.entries(required)
    .filter(([_, v]) => v === undefined || v === null || v.toString().trim() === '')
    .map(([k]) => k);

  if (emptyFields.length) {
    res.status(400);
    throw new Error(`Please fill all fields: ${emptyFields.join(', ')}`);
  }

  let toolsArray = [];
  if (Array.isArray(tools)) {
    toolsArray = tools.map((t) => t.trim());
  } else if (typeof tools === 'string') {
    toolsArray = tools.split(',').map((t) => t.trim());
  } else {
    res.status(400);
    throw new Error('tools must be an array or a comma‑separated string');
  }

  let imageUrl = '';
  if (image.startsWith('data:')) {

    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: 'portfolio',
      resource_type: 'image',
    });
    imageUrl = uploadRes.secure_url;
  } else {

    imageUrl = image.trim();
  }

  const project = await Project.create({
    title: title.trim(),
    desc,
    link: link.trim(),
    image: imageUrl,
    tools: toolsArray,
  });

  res.status(201).json(project);
};

module.exports = {
  addProject
}
