var mongoose = require("mongoose");
//User Roles Schema
var UserRolesSchema = new mongoose.Schema({
  RoleID: Number,
  RoleName: String //a. Roles will be i. Administrator ii. Operator iii. AccessUser
});

module.exports = mongoose.model("UserRoles", UserRolesSchema);
