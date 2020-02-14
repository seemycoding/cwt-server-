﻿const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

module.exports = {
  authenticate,
  delete: _delete,
  getAll,
  getById,
  create,
  update
};

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  console.log(user);
  if (user.password == password) {
    const { password, ...userWithoutHash } = user.toObject();

    return {
      ...userWithoutHash
    };
  
  }
}

async function getAll() {
  return await User.find();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}

async function getById(id) {
  return await User.findById(id).select("-hash");
}

async function create(userParam) {
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.password = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  //user
  Object.assign(user, userParam);

  await user.save();
}
