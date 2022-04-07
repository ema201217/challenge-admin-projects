const { uploadInBucket } = require("../helpers");
const db = require("../models");

const update = async (req, res) => {
  const { id } = req.params;
  const { username, roleId, roleProject } = req.body;
  let fileURL;
  try {
    if (req.files?.avatar) {
      const { Location } = await uploadInBucket(req.files.avatar);
      fileURL = Location;
    }
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: "user not found",
      });
    }

    user.username = username || user.username;
    user.roleId = roleId || user.roleId;
    user.roleProject = roleProject || user.roleProject;
    user.avatar = fileURL || user.avatar;

    await user.save();
    const { password, deletedAt, ...rest } = user.dataValues;

    return res.status(200).json({
      message: "user updated successfully",
      user: rest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    // As paranoid at model is setted to true, destroy method will make a soft delete;
    const userDeleted = await db.User.destroy({
      where: {
        id,
      },
    });
    if (userDeleted) {
      res.status(200).json({
        ok: true,
        msg: `user with id ${id} was deleted successfully`,
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: `the id ${id} is no longer available in database`,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const list = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ["password"] },
    });
    return res.status(200).json({
      ok: true,
      msg: "list of users",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "internal server error",
    });
  }
};

module.exports = {
  update,
  remove,
  list,
};
