const User = require("../models/user");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) return res.status(204).json({ message: "No users found" });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    await User.findByIdAndRemove(id);
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Id parameter required" });

  try {
    const userFind = await User.findById(id);

    if (!userFind)
      return res.status(404).json({ message: "No product matches Id" });

    res.status(200).json(userFind);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { email, password, username, roles } = req.body;
  if (!email || !password || !username)
    return res.status(400).json({ message: "More data are required" });

  try {
    const duplicate = await User.findOne({ email }).exec();
    if (duplicate)
      return res.status(400).json({ message: "User already exist" });
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPwd,
      email,
      roles,
    });
    await newUser.save();
    res.status(201).json({ success: "New user created" });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const userUpdated = {
      username,
      email,
    };
    await User.findByIdAndUpdate(id, userUpdated);
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  createUser,
  updateUser,
};
