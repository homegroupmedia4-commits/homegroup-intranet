const Resource = require("../models/Resource");

exports.getResources = async (req, res) => {
  const resources = await Resource.find().sort({ createdAt: -1 });
  res.json(resources);
};

exports.createResource = async (req, res) => {
  const resource = await Resource.create(req.body);
  res.json(resource);
};

exports.deleteResource = async (req, res) => {
  await Resource.findByIdAndDelete(req.params.id);
  res.json({ message: "Supprimé" });
};
