const { LIMIT_PAGE } = require("../constants/constants");
const { paginated } = require("../helpers");
const db = require("../models");

const list = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const { results, next, prev } = await paginated(
      db.Project,
      LIMIT_PAGE,
      +page,
      req
    );

    if (!results.length) {
      return res.status(200).json({
        ok: false,
        msg: "There are not projects created",
      });
    }
    res.status(200).json({ ok: true, prev, next, results });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const isDeleted = await db.Project.destroy({
      where: {
        id,
      },
    });
    if (isDeleted) {
      return res.status(404).json({
        ok: false,
        msg: `the id ${id} does not correspond to any project`,
      });
    }

    res.status(200).json({
      ok: true,
      msg: `project with id ${id}, was deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const store = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    const newProject = await db.Project.create({
      name,
      description,
      status,
    });
    return res.status(201).json({
      ok: true,
      msg: `Created ${newProject.name} project`,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const project = await db.Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        msg: "project not found",
      });
    }

    project.name = name || project.name;
    project.description = description || project.description;
    project.status = status || project.status;

    await project.save();

    res.status(200).json({
      ok: true,
      msg: "project updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

module.exports = {
  list,
  remove,
  store,
  update,
};
