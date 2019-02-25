var mongoose = require("mongoose");
//Users Schema
var UsersSchema = new mongoose.Schema(
  {
    UserID: Number,
    UserName: String,
    Email: String,
    Password: String,
    RoleId: Number,
    PersonalUniqueueID: { type: String, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UsersSchema);
