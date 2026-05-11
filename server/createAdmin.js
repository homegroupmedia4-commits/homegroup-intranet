require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  const exists = await Admin.findOne({
    email: process.env.ADMIN_EMAIL
  });

  if (exists) {
    console.log("Admin existe déjà");
    process.exit();
  }

  const hashed = await bcrypt.hash(
    process.env.ADMIN_PASSWORD,
    10
  );

  await Admin.create({
    email: process.env.ADMIN_EMAIL,
    password: hashed
  });

  console.log("Admin créé");

  process.exit();
});
