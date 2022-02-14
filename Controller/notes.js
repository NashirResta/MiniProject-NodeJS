const db = require("../helper/relation");

const { Notes, User } = db;

module.exports = {
  createNotes: async (req, res) => {
    try {
      const data = await Notes.create({
        userId: req.body.userId,
        name: req.body.name,
        activity: req.body.activity,
        day: req.body.day,
        date: req.body.date,
      });
      res.json({ data });
    } catch (error) {
      console.log(Error.message);
      res.status(422).json({ Message: Error.sqlMessage });
    }
  },

  getNotes: async (req, res) => {
    const data = await Notes.findAll({});
    res.json(data);
  },

  updateNotes: async (req, res) => {
    const id = req.params.id;
    const data = await Notes.update(
      {
        userId: req.body.userId,
        name: req.body.name,
        activity: req.body.activity,
        day: req.body.day,
        date: req.body.date,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({ Message: `Succesfull to Update Notes!` });
  },

  deleteNotes: async (req, res) => {
    const id = req.params.id;
    const data = await Notes.destroy({
      where: {
        id: id,
      },
    });
    res.json({ Message: `Succesfull to Delete Notes!` });
  },
};
