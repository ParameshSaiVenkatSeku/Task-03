const knex = require("../../mysql/knexfile");

exports.isEmailTaken = async (email) => {
  return knex("users").where({ email }).first();
};

exports.createUser = async (userData) => {
  return knex("users").insert(userData);
};
