const User = require("../../models/user");
const Profile = require("../../models/profile");
const ValidateRegisterInput = require("../../validators/register");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db/db");

const handleCreateUser = async (req, res) => {
  const { errors, isValid } = ValidateRegisterInput(req.body);
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    age,
    image,
  } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .json({ credentials: "A user has already Registered !" });

  const registed_user = new User({
    // Manually Created
    email: email,
    age: age,
    password: password,
    firstName: firstName,
    LastName: lastName,
    passwordConfirmation: passwordConfirmation,
  });

  bcryptjs.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcryptjs.hash(registed_user.password, salt, async (err, hash) => {
      if (err) throw err;
      registed_user.password = hash;
      registed_user.passwordConfirmation = hash;

      try {
        const user = await registed_user.save();
        if (user) {
          if (!image) {
            await Profile.create({ user: user._id.toString(), image: null }); //
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
          }

          await Profile.create({ user: user._id.toString(), image: image });
          const payload = { id: user.id, email: user.email };
          jwt.sign(
            payload,
            db.accessSecretToken,
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
        }
      } catch (err) {
        return res.json({ user: null, ok: true });
      }
    });
  });
};

module.exports = handleCreateUser;
