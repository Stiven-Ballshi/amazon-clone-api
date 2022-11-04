const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db/db");

const handleSignInUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "This user does not exist" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const payload = { id: user.id, email: user.email };
    jwt.sign(
      payload,
      db.accessSecretToken, // for encrypt the jwt token
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        return res.json({
          user: user,
          ok: true,
          token: "Bearer " + token,
        });
      }
    );
  } else {
    res.status(403).json({ password: "Incorrect Password" });
  }
};

module.exports = handleSignInUser;
