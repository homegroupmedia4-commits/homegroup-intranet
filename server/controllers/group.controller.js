const Group = require("../models/Group");

// GET
exports.getGroup = async (req, res) => {
  const data = await Group.findOne();
  res.json(data);
};

// UPDATE
exports.updateGroup = async (req, res) => {
  const data = await Group.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true
  });

  res.json(data);
};
