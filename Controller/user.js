const jwt = require("jsonwebtoken");
const db = require("../helper/relation");

const bcrypt = require("bcrypt");

const { User, Notes } = db;

module.exports = {
  msg: (req, res) => {
    console.log("hello bung!");
    res.end();
  },

  createUser: async (req, res) => {
    const saltRound = 7;
    const password = req.body.password;
    const hashPassword = await bcrypt.hash(password, saltRound);
    try {
      const data = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPassword,
        confirmpassword: req.body.confirmpassword,
      });
      res.json(data);
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const data = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!data) {
        throw Error(`Data Not Found!`);
      }
      const isVeryfied = await bcrypt.compare(password, data.password);
      console.log(isVeryfied);
      if (!isVeryfied) {
        throw Error(`Wrong Password!`);
      }

      const payload = {
        ID: data.dataValues.id,
        email: email,
      };
      const token = jwt.sign(payload, "hey");
      res.json({ message: "Login Berhasil", email: data.email, token: token });
    } catch (err) {
      res.json({ msg: err.message });
    }
  },

  register: async (req, res) => {
    try {
      const email = req.body.email;
      const data = await User.findOne({
        where: {
          email: email,
        },
      });
      console.log(req.payload);
      res.json({ userId: data.id, email: data.email });
    } catch (Error) {
      console.log(Error.message);
      res.status(422).json({ message: Error.sqlMessage });
    }
  },

  userDetail: async (req, res) => {
    const data = await User.findOne({
      where: {
        id: req.payload.ID,
      },
      include: [{ model: Notes }],
    });
    res.json({ data });
  },

  getUser: async (req, res) => {
    const data = await User.findAll({});
    res.json(data);
  },

  pagination: async (req, res) => {
    try {
      const data = await User.findAll({
        limit: JSON.parse(req.query.size),
        offset: JSON.parse(req.query.page),
      });
      if (data == 0) {
        res.status(404).json({ message: "reach limit" });
      }
      res.json(data);
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  },

  getUserId: async (req, res) => {
    const data = await User.findOne({
      where: { id: req.params.id },
      include: [{ model: Notes }],
    });
    res.json(data);
  },

  getUserEmail: async (req, res) => {
    try {
      const data = await User.findAll({
        where: {
          email: req.params.email,
        },
      });
      if (data.length > 0) {
        res.status(201).json({ message: "succes get data", data: data });
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    const id = req.params.id;
    const data = await User.update(
      {
        firstname: req.body.username,
        lastname: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({ Message: `Succes to Update User Id ${id}` });
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;
    const data = await User.destroy({
      where: {
        id: id,
      },
    });
    res.json({ Messsage: `Succesfull to delete User id ${id}!` });
  },

  logout: async (req, res) => {
    res.status(200).json({ message: `Anda Sudah Log Out` });
  },
};
