const mongosse = require("mongoose");
const Schema = mongosse.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    roles: [Number],
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongosse.model("User", userSchema);
