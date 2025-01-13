const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "user_id"; // The primary key column
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["first_name", "username", "password", "email"],

      properties: {
        user_id: { type: "integer" },
        first_name: { type: "string", minLength: 1, maxLength: 255 },
        username: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", format: "email" },
        profile_pic: { type: "string", maxLength: 1024 },
        thumbnail: { type: "string", maxLength: 1024 },
        status: { type: "integer", enum: [0, 1], default: 0 },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = User;
