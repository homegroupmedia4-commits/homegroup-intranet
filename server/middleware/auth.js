const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      return res.status(401).json({
        error: "Non autorisé"
      });
    }

    const token = auth.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.admin = decoded;

    next();

  } catch (err) {
    return res.status(401).json({
      error: "Token invalide"
    });
  }
};
