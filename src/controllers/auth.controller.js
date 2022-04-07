const bcrypt = require("bcryptjs");
const db = require("../db/models");
const { createJWT } = require("../helpers");

const register = async (req, res) => {
  try {
    const { username, email, password: pass, roleId, roleProject } = req.body;
    const passwordHash = await bcrypt.hash(pass, 10);
    const newUser = await db.User.create({
      email,
      password: passwordHash,
      username,
      avatar:
        "https://www.seekpng.com/png/full/428-4287240_no-avatar-user-circle-icon-png.png",
      roleId: +roleId,
      roleProject: +roleProject,
    });

    // Create JWT
    const token = await createJWT({
      roleId: newUser.roleId,
      email: newUser.email,
      id: newUser.id,
    });

    const { password, ...rest } = newUser.dataValues;

    res.status(201).json({
      ok: true,
      msg: "User created successfully",
      user: rest,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const where = email
      ? { where: { email } }
      : username
      ? { where: { username } }
      : { where: "" };

    const user = await db.User.findOne(where);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: `The ${email || username} not exist`,
      });
    }

    // Verify Password
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) {
      return res.status(400).json({
        ok: false,
        msg: "The password is wrong",
      });
    }

    // Create JWT
    const { roleId, id } = user;
    const token = await createJWT({ roleId, email, id });

    res.status(200).json({
      ok: true,
      msg: "User logged in",
      token,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message,
    });
  }
};

const getUserAuthenticated = async (req, res) => {
  try {
    const { id } = req.user.user;
    const user = await db.User.findByPk(id, {
      attributes: {
        exclude: ["password", "deletedAt", "roleId", "roleProject"],
      },
      include: ["projects", "role", "mission"],
    });
    res.status(200).json({ ok: true, user });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getUserAuthenticated,
};
