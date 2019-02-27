var mongoose = require("mongoose");
var AccessUserModel = require("./../models/normal.user.model");
var UseModel = require("./../models/user.model");
var AccessUser = mongoose.model("AccessUser");
var TempAccessUser = mongoose.model("TempAccessUser");
var User = mongoose.model("Users");
var express = require("express");
var jwt = require("jsonwebtoken");
var app = express();
var jwtSettings = {
  jwtSecret: "sbibobbompnb37645sbi28yesbi"
};
app.set("jwtSecret", jwtSettings["jwtSecret"]);
var AccessUserController = {};

//Authenticate Access User
AccessUserController.AuthAccessUser = function(request, response) {};

//Approve Normal User Updated Info
AccessUserController.Approve = function(request, response) {
  //JSON.stringify(obj1) === JSON.stringify(obj2)
  var accessUser = request.body.accessUser;
  //console.log(accessUser);
  var id = accessUser._id;
  var tokenRecived = request.headers.authorization.split(" ")[1];
  var Role = request.headers.role;
  jwt.verify(tokenRecived, app.get("jwtSecret"), function(err, decoded) {
    if (err) {
      response.send({ success: false, message: "Token verification failed" });
    } else {
      request.decoded = decoded;
      if (Role === "1") {
        TempAccessUser.deleteOne({ _id: id }, function(err, res) {
          if (!err) {
            if (res != null) {
              if (res.deletedCount > 0) {
                delete accessUser._id;
                AccessUser.create(accessUser, function(err, res) {
                  if (!err) {
                    if (res != null) {
                      response.send({
                        data: res,
                        statusMessage: "User Created Successful",
                        statusCode: 200
                      });
                    } else {
                      response.send({ error: "User Creation Failed." });
                    }
                  } else {
                    response.send({ error: err });
                  }
                });
              }
            }
          }
        });
      }
    }
  });
};
//Search Normal User
AccessUserController.SearchAccessUser = function(request, response) {
  var tokenRecived = request.headers.authorization.split(" ")[1];
  var Criteria = request.headers.criteria;
  var SearchKey = request.headers.searchkey;
  var SearchValue = request.headers.searchvalue;

  jwt.verify(tokenRecived, app.get("jwtSecret"), function(err, decoded) {
    if (err) {
      response.send({ success: false, message: "Token verification failed" });
    } else {
      request.decoded = decoded;
      var returnedAccessUserObjects = [];
      if (Criteria == "InActive") {
        var queryTempAccessUser = null;
        if (SearchKey === "UserName") {
          queryTempAccessUser = TempAccessUser.find({
            $and: [{ PersonalUniqueueID: "-1" }]
          }).select("-_id -__v -updatedAt");
          queryTempAccessUser.exec(function(err, res) {
            if (!err) {
              if (res != null) {
                res.forEach(element => {
                  var tempObj = new Object();
                  tempObj.FullName = element.FullName;
                  tempObj.FirstName = element.FullName.split("~")[0];
                  tempObj.MiddleName = element.FullName.split("~")[1];
                  tempObj.LastName = element.FullName.split("~")[2];
                  if (
                    SearchValue === tempObj.FirstName ||
                    SearchValue === tempObj.MiddleName ||
                    SearchValue === tempObj.LastName
                  ) {
                    var Obj = new Object();
                    Obj.FullName = element.FullName;
                    Obj.FirstName = element.FullName.split("~")[0];
                    Obj.MiddleName = element.FullName.split("~")[1];
                    Obj.LastName = element.FullName.split("~")[2];
                    Obj.PersonalUniqueueID = element.PersonalUniqueueID;
                    Obj.GenderIs = element.Gender;
                    Obj.DateOfBirth = element.DateOfBirth;
                    Obj.Age = element.Age;
                    Obj.Address = element.Address;
                    Obj.FlatOrBungalowNumber = element.Address.split("~")[0];
                    Obj.SocietyName = element.Address.split("~")[1];
                    Obj.StreetName = element.Address.split("~")[2];
                    Obj.City = element.City;
                    Obj.State = element.State;
                    Obj.PinCode = element.PinCode;
                    Obj.PhoneNo = element.PhoneNo;
                    Obj.MobileNo = element.MobileNo;
                    Obj.IsPhysicalDisability = element.PhysicalDisability;
                    Obj.Married = element.MaritalStatus;
                    Obj.Education = element.EducationStatus;
                    Obj.BirthSign = element.BirthSign;
                    var date = new Date(element.createdAt);
                    date = date.toUTCString();
                    Obj.createdAt = date;
                    returnedAccessUserObjects.push(Obj);
                  }
                });

                response.send({
                  data: returnedAccessUserObjects
                });
              } else {
                response.send({
                  data: returnedAccessUserObjects
                });
              }
            }
          });
        } else if (SearchKey !== "UserName") {
          if (SearchKey === "Mobile") {
            queryTempAccessUser = TempAccessUser.find({
              $and: [{ Mobile: SearchValue }, { PersonalUniqueueID: "-1" }]
            }).select("-_id -__v -updatedAt");
          } else if (SearchKey === "Gender") {
            queryTempAccessUser = TempAccessUser.find({
              $and: [{ Gender: SearchValue }, { PersonalUniqueueID: "-1" }]
            }).select("-_id -__v -updatedAt");
          }
          queryTempAccessUser.exec(function(err, res) {
            if (!err) {
              console.log(res);
              if (res != null) {
                res.forEach(element => {
                  var Obj = new Object();
                  Obj.PersonalUniqueueID = element.PersonalUniqueueID;
                  Obj.FullName = element.FullName;
                  Obj.FirstName = element.FullName.split("~")[0];
                  Obj.MiddleName = element.FullName.split("~")[1];
                  Obj.LastName = element.FullName.split("~")[2];
                  Obj.GenderIs = element.Gender;
                  Obj.DateOfBirth = element.DateOfBirth;
                  Obj.Age = element.Age;
                  Obj.Address = element.Address;
                  Obj.FlatOrBungalowNumber = element.Address.split("~")[0];
                  Obj.SocietyName = element.Address.split("~")[1];
                  Obj.StreetName = element.Address.split("~")[2];
                  Obj.City = element.City;
                  Obj.State = element.State;
                  Obj.PinCode = element.PinCode;
                  Obj.PhoneNo = element.PhoneNo;
                  Obj.MobileNo = element.MobileNo;
                  Obj.IsPhysicalDisability = element.PhysicalDisability;
                  Obj.Married = element.MaritalStatus;
                  Obj.Education = element.EducationStatus;
                  Obj.BirthSign = element.BirthSign;
                  var date = new Date(element.createdAt);
                  date = date.toUTCString();
                  Obj.createdAt = date;
                  returnedAccessUserObjects.push(Obj);
                });
                response.send({
                  data: returnedAccessUserObjects
                });
              } else {
                response.send({
                  data: returnedAccessUserObjects
                });
              }
            }
          });
        }
      } else if (Criteria === "Active") {
        var queryAccessUser = null;
        if (SearchKey === "UserName") {
          queryAccessUser = AccessUser.find({
            UserName: SearchValue
          }).select("-_id -__v -updatedAt");
          queryTempAccessUser.exec(function(err, res) {
            if (!err) {
              if (res != null) {
                res.forEach(element => {
                  var tempObj = new Object();
                  tempObj.FullName = element.FullName;
                  tempObj.FirstName = element.FullName.split("~")[0];
                  tempObj.MiddleName = element.FullName.split("~")[1];
                  tempObj.LastName = element.FullName.split("~")[2];
                  if (
                    SearchValue === tempObj.FirstName ||
                    SearchValue === tempObj.MiddleName ||
                    SearchValue === tempObj.LastName
                  ) {
                    var Obj = new Object();
                    Obj.FullName = element.FullName;
                    Obj.FirstName = element.FullName.split("~")[0];
                    Obj.MiddleName = element.FullName.split("~")[1];
                    Obj.LastName = element.FullName.split("~")[2];
                    Obj.PersonalUniqueueID = element.PersonalUniqueueID;
                    Obj.GenderIs = element.Gender;
                    Obj.DateOfBirth = element.DateOfBirth;
                    Obj.Age = element.Age;
                    Obj.Address = element.Address;
                    Obj.FlatOrBungalowNumber = element.Address.split("~")[0];
                    Obj.SocietyName = element.Address.split("~")[1];
                    Obj.StreetName = element.Address.split("~")[2];
                    Obj.City = element.City;
                    Obj.State = element.State;
                    Obj.PinCode = element.PinCode;
                    Obj.PhoneNo = element.PhoneNo;
                    Obj.MobileNo = element.MobileNo;
                    Obj.IsPhysicalDisability = element.PhysicalDisability;
                    Obj.Married = element.MaritalStatus;
                    Obj.Education = element.EducationStatus;
                    Obj.BirthSign = element.BirthSign;
                    var date = new Date(element.createdAt);
                    date = date.toUTCString();
                    Obj.createdAt = date;
                    returnedAccessUserObjects.push(Obj);
                  }
                });
                response.send({
                  data: returnedAccessUserObjects
                });
              } else {
                response.send({
                  data: returnedAccessUserObjects
                });
              }
            }
          });
        } else if (SearchKey !== "UserName") {
          if (SearchKey === "Mobile") {
            queryAccessUser = AccessUser.find({
              Mobile: SearchValue
            }).select("-_id -__v -updatedAt");
          } else if (SearchKey === "Gender") {
            queryAccessUser = AccessUser.find({
              Gender: SearchValue
            }).select("-_id -__v -updatedAt");
          }
          queryAccessUser.exec(function(err, res) {
            if (!err) {
              if (res != null) {
                console.log("In Active Search Success");
                res.forEach(element => {
                  var Obj = new Object();
                  Obj.PersonalUniqueueID = element.PersonalUniqueueID;
                  Obj.FullName = element.FullName;
                  Obj.FirstName = element.FullName.split("~")[0];
                  Obj.MiddleName = element.FullName.split("~")[1];
                  Obj.LastName = element.FullName.split("~")[2];
                  Obj.GenderIs = element.Gender;
                  Obj.DateOfBirth = element.DateOfBirth;
                  Obj.Age = element.Age;
                  Obj.Address = element.Address;
                  Obj.FlatOrBungalowNumber = element.Address.split("~")[0];
                  Obj.SocietyName = element.Address.split("~")[1];
                  Obj.StreetName = element.Address.split("~")[2];
                  Obj.City = element.City;
                  Obj.State = element.State;
                  Obj.PinCode = element.PinCode;
                  Obj.PhoneNo = element.PhoneNo;
                  Obj.MobileNo = element.MobileNo;
                  Obj.IsPhysicalDisability = element.PhysicalDisability;
                  Obj.Married = element.MaritalStatus;
                  Obj.Education = element.EducationStatus;
                  Obj.BirthSign = element.BirthSign;
                  var date = new Date(element.createdAt);
                  date = date.toUTCString();
                  Obj.createdAt = date;
                  returnedAccessUserObjects.push(Obj);
                });
                response.send({
                  data: returnedAccessUserObjects
                });
              } else {
                response.send({
                  data: returnedAccessUserObjects
                });
              }
            }
          });
        }
      } else if (Criteria === "Pending") {
        var queryTempAccessUser = null;
        if (SearchKey === "UserName") {
          queryTempAccessUser = TempAccessUser.find({
            $and: [
              { ApproveStatus: "Pending" },
              { PersonalUniqueueID: { $gt: -1 } }
            ]
          }).select("-_id -__v -updatedAt");
          queryTempAccessUser.exec(function(err, res) {
            if (!err) {
              if (res != null) {
                res.forEach(element => {
                  var tempObj = new Object();
                  tempObj.FullName = element.FullName;
                  tempObj.FirstName = element.FullName.split("~")[0];
                  tempObj.MiddleName = element.FullName.split("~")[1];
                  tempObj.LastName = element.FullName.split("~")[2];
                  if (
                    SearchValue === tempObj.FirstName ||
                    SearchValue === tempObj.MiddleName ||
                    SearchValue === tempObj.LastName
                  ) {
                    var Obj = new Object();
                    Obj.FullName = element.FullName;
                    Obj.FirstName = element.FullName.split("~")[0];
                    Obj.MiddleName = element.FullName.split("~")[1];
                    Obj.LastName = element.FullName.split("~")[2];
                    Obj.PersonalUniqueueID = element.PersonalUniqueueID;
                    Obj.GenderIs = element.Gender;
                    Obj.DateOfBirth = element.DateOfBirth;
                    Obj.Age = element.Age;
                    Obj.Address = element.Address;
                    Obj.FlatOrBungalowNumber = element.Address.split("~")[0];
                    Obj.SocietyName = element.Address.split("~")[1];
                    Obj.StreetName = element.Address.split("~")[2];
                    Obj.City = element.City;
                    Obj.State = element.State;
                    Obj.PinCode = element.PinCode;
                    Obj.PhoneNo = element.PhoneNo;
                    Obj.MobileNo = element.MobileNo;
                    Obj.IsPhysicalDisability = element.PhysicalDisability;
                    Obj.Married = element.MaritalStatus;
                    Obj.Education = element.EducationStatus;
                    Obj.BirthSign = element.BirthSign;
                    Obj.ApproveStatus = element.ApproveStatus;
                    var date = new Date(element.createdAt);
                    date = date.toUTCString();
                    Obj.createdAt = date;
                    returnedAccessUserObjects.push(Obj);
                  }
                });
                response.send({
                  data: returnedAccessUserObjects
                });
              } else {
                response.send({
                  data: returnedAccessUserObjects
                });
              }
            }
          });
        } else if (SearchKey !== "UserName") {
          if (SearchKey === "Mobile") {
            queryTempAccessUser = TempAccessUser.find({
              $and: [
                { Mobile: SearchValue },
                { ApproveStatus: "Pending" },
                { PersonalUniqueueID: { $gt: -1 } }
              ]
            }).select("-_id -__v -updatedAt");
          } else if (SearchKey === "Gender") {
            queryTempAccessUser = TempAccessUser.find({
              $and: [
                { Gender: SearchValue },
                { ApproveStatus: "Pending" },
                { PersonalUniqueueID: { $gt: -1 } }
              ]
            }).select("-_id -__v -updatedAt");
          }
          queryTempAccessUser.exec(function(err, res) {
            if (!err) {
              if (res != null) {
                res.forEach(element => {
                  var Obj = new Object();
                  Obj.PersonalUniqueueID = element.PersonalUniqueueID;
                  Obj.FullName = element.FullName;
                  Obj.FirstName = element.FullName.split("~")[0];
                  Obj.MiddleName = element.FullName.split("~")[1];
                  Obj.LastName = element.FullName.split("~")[2];
                  Obj.GenderIs = element.Gender;
                  Obj.DateOfBirth = element.DateOfBirth;
                  Obj.Age = element.Age;
                  Obj.Address = element.Address;
                  Obj.FlatOrBungalowNumber = element.Address.split("~")[0];
                  Obj.SocietyName = element.Address.split("~")[1];
                  Obj.StreetName = element.Address.split("~")[2];
                  Obj.City = element.City;
                  Obj.State = element.State;
                  Obj.PinCode = element.PinCode;
                  Obj.PhoneNo = element.PhoneNo;
                  Obj.MobileNo = element.MobileNo;
                  Obj.IsPhysicalDisability = element.PhysicalDisability;
                  Obj.Married = element.MaritalStatus;
                  Obj.Education = element.EducationStatus;
                  Obj.BirthSign = element.BirthSign;
                  Obj.ApproveStatus = element.ApproveStatus;
                  var date = new Date(element.createdAt);
                  date = date.toUTCString();
                  Obj.createdAt = date;
                  returnedAccessUserObjects.push(Obj);
                });
                response.send({
                  data: returnedAccessUserObjects
                });
              } else {
                response.send({
                  data: returnedAccessUserObjects
                });
              }
            }
          });
        }
      }
    }
  });
};
//Get List Of Normal Users
AccessUserController.GetAllUsers = function(request, response) {
  var tokenRecived = request.headers.authorization.split(" ")[1];
  jwt.verify(tokenRecived, app.get("jwtSecret"), function(err, decoded) {
    if (err) {
      response.send({ success: false, message: "Token verification failed" });
    } else {
      request.decoded = decoded;
      var returnedAccessUserObjects = [];
      var returnedTempAccessUserObjects = [];

      var queryAccessUser = AccessUser.find({}).select("-_id -__v -updatedAt");
      queryAccessUser.exec(function(err, res) {
        if (!err) {
          if (res != null) {
            res.forEach(element => {
              var Obj = new Object();
              Obj.PersonalUniqueueID = element.PersonalUniqueueID;
              Obj.FullName = element.FullName;
              Obj.FirstName = element.FullName.split("~")[0];
              Obj.MiddleName = element.FullName.split("~")[1];
              Obj.LastName = element.FullName.split("~")[2];
              Obj.GenderIs = element.Gender;
              Obj.DateOfBirth = element.DateOfBirth;
              Obj.Age = element.Age;
              Obj.Address = element.Address;
              Obj.FlatOrBungalowNumber = element.Address.split("~")[0];
              Obj.SocietyName = element.Address.split("~")[1];
              Obj.StreetName = element.Address.split("~")[2];
              Obj.City = element.City;
              Obj.State = element.State;
              Obj.PinCode = element.PinCode;
              Obj.PhoneNo = element.PhoneNo;
              Obj.MobileNo = element.MobileNo;
              Obj.IsPhysicalDisability = element.PhysicalDisability;
              Obj.Married = element.MaritalStatus;
              Obj.Education = element.EducationStatus;
              Obj.BirthSign = element.BirthSign;
              var date = new Date(element.createdAt);
              date = date.toUTCString();
              Obj.createdAt = date;
              returnedAccessUserObjects.push(Obj);
            });
            var queryTempAccessUser = TempAccessUser.find({}).select(
              "-__v -updatedAt"
            );
            queryTempAccessUser.exec(function(temperr, tempres) {
              if (!temperr) {
                if (tempres != null) {
                  tempres.forEach(element => {
                    var Obj = new Object();
                    Obj._id = element._id;
                    Obj.PersonalUniqueueID = element.PersonalUniqueueID;
                    Obj.FullName = element.FullName;
                    Obj.FirstName = element.FullName.split("~")[0];
                    Obj.MiddleName = element.FullName.split("~")[1];
                    Obj.LastName = element.FullName.split("~")[2];
                    Obj.GenderIs = element.Gender;
                    Obj.DateOfBirth = element.DateOfBirth;
                    Obj.Age = element.Age;
                    Obj.Address = element.Address;
                    Obj.FlatOrBungalowNumber = element.Address.split("~")[0];
                    Obj.SocietyName = element.Address.split("~")[1];
                    Obj.StreetName = element.Address.split("~")[2];
                    Obj.City = element.City;
                    Obj.State = element.State;
                    Obj.PinCode = element.PinCode;
                    Obj.PhoneNo = element.PhoneNo;
                    Obj.MobileNo = element.MobileNo;
                    Obj.IsPhysicalDisability = element.PhysicalDisability;
                    Obj.Married = element.MaritalStatus;
                    Obj.Education = element.EducationStatus;
                    Obj.BirthSign = element.BirthSign;
                    Obj.ApproveStatus = element.ApproveStatus;
                    var date = new Date(element.createdAt);
                    date = date.toUTCString();
                    Obj.createdAt = date;
                    returnedTempAccessUserObjects.push(Obj);
                  });
                  response.send({
                    data: returnedAccessUserObjects.concat(
                      returnedTempAccessUserObjects
                    )
                  });
                }
              }
            });
          } else {
            response.send({ error: "User Creation Failed." });
          }
        } else {
          response.send({ error: err });
        }
      });
    }
  });
};

//Create Normal User
AccessUserController.Create = function(request, response) {
  var accessUser = request.body.accessUser;
  var tokenRecived = request.headers.authorization.split(" ")[1];
  var Role = request.headers.role;
  //console.log(accessUser);

  jwt.verify(tokenRecived, app.get("jwtSecret"), function(err, decoded) {
    if (err) {
      response.send({ success: false, message: "Token verification failed" });
    } else {
      request.decoded = decoded;
      if (Role === "1") {
        var AccessUserID = accessUser.UserId;
        delete accessUser.UserId;
        AccessUser.create(accessUser, function(err, res) {
          if (!err) {
            if (res != null) {
              User.create(
                {
                  UserID: AccessUserID,
                  Email: null,
                  UserName: accessUser.FullName.split("~")[0],
                  Password: accessUser.FullName.split("~")[2],
                  RoleId: "3",
                  PersonalUniqueueID: accessUser.PersonalUniqueueID
                },
                function(err, resp) {
                  if (!err) {
                    if (resp != null) {
                      response.send({
                        data: res,
                        statusMessage: "User Created Successful",
                        statusCode: 200
                      });
                    }
                  }
                }
              );
            } else {
              response.send({ error: "User Creation Failed." });
            }
          } else {
            response.send({ error: err });
          }
        });
      } else {
        TempAccessUser.create(accessUser, function(err, res) {
          if (!err) {
            if (res != null) {
              response.send({
                data: res,
                statusMessage: "User Created Successful Needs Admin Activation",
                statusCode: 200
              });
            } else {
              response.send({ error: "User Creation Failed." });
            }
          } else {
            response.send({ error: err });
          }
        });
      }
    }
  });
};

//Update Normal User
AccessUserController.Update = function(request, response) {
  var AccessUserRecieved = request.body.accessUser;
  var tokenRecived = request.headers.authorization.split(" ")[1];
  var Role = request.headers.role;
  jwt.verify(tokenRecived, app.get("jwtSecret"), function(err, decoded) {
    if (err) {
      response.send({ success: false, message: "Token verification failed" });
    } else {
      request.decoded = decoded;
      if (Role === "1") {
        if (AccessUserRecieved.PersonalUniqueueID === "-1") {
          TempAccessUser.updateOne(
            { _id: AccessUserRecieved._id },
            {
              $set: {
                FullName: AccessUserRecieved.FullName,
                Gender: AccessUserRecieved.Gender,
                DateOfBirth: AccessUserRecieved.DateOfBirth,
                Age: AccessUserRecieved.Age,
                Address: AccessUserRecieved.Address,
                City: AccessUserRecieved.City,
                State: AccessUserRecieved.State,
                PinCode: AccessUserRecieved.PinCode,
                PhoneNo: AccessUserRecieved.PhoneNo,
                MobileNo: AccessUserRecieved.MobileNo,
                PhysicalDisability: AccessUserRecieved.PhysicalDisability,
                MaritalStatus: AccessUserRecieved.MaritalStatus,
                EducationStatus: AccessUserRecieved.EducationStatus,
                BirthSign: AccessUserRecieved.BirthSign
              }
            },
            function(err, res) {
              if (!err) {
                if (res != null) {
                  response.send({
                    data: res,
                    statusMessage: "User Updated Successful",
                    statusCode: 200
                  });
                } else {
                  response.send({ error: "User Updation Failed." });
                }
              } else {
                response.send({ error: err });
              }
            }
          );
        } else {
          AccessUser.updateOne(
            { PersonalUniqueueID: AccessUserRecieved.PersonalUniqueueID },
            {
              $set: {
                FullName: AccessUserRecieved.FullName,
                Gender: AccessUserRecieved.Gender,
                DateOfBirth: AccessUserRecieved.DateOfBirth,
                Age: AccessUserRecieved.Age,
                Address: AccessUserRecieved.Address,
                City: AccessUserRecieved.City,
                State: AccessUserRecieved.State,
                PinCode: AccessUserRecieved.PinCode,
                PhoneNo: AccessUserRecieved.PhoneNo,
                MobileNo: AccessUserRecieved.MobileNo,
                PhysicalDisability: AccessUserRecieved.PhysicalDisability,
                MaritalStatus: AccessUserRecieved.MaritalStatus,
                EducationStatus: AccessUserRecieved.EducationStatus,
                BirthSign: AccessUserRecieved.BirthSign
              }
            },
            function(err, res) {
              if (!err) {
                if (res != null) {
                  response.send({
                    data: res,
                    statusMessage: "User Updated Successful",
                    statusCode: 200
                  });
                } else {
                  response.send({ error: "User Updation Failed." });
                }
              } else {
                response.send({ error: err });
              }
            }
          );
        }
      } else {
        var _Id = request.headers._id;
        if (AccessUserRecieved.PersonalUniqueueID !== "-1") {
          AccessUser.deleteOne(
            { PersonalUniqueueID: AccessUserRecieved.PersonalUniqueueID },
            function(err, res) {
              if (!err) {
                if (res != null) {
                  if (res.deletedCount > 0) {
                    TempAccessUser.create(AccessUserRecieved, function(
                      err,
                      res
                    ) {
                      if (!err) {
                        if (res != null) {
                          response.send({
                            data: res,
                            statusMessage: "User Sent For Approval",
                            statusCode: 200
                          });
                        } else {
                          response.send({
                            error: "User Sent For Approval Failed."
                          });
                        }
                      } else {
                        response.send({ error: err });
                      }
                    });
                  } else {
                    response.send({
                      error: "User Already Sent For Approval"
                    });
                  }
                } else {
                  response.send({ error: "User Sent For Approval Failed." });
                }
              } else {
                response.send({ error: err });
              }
            }
          );
          //Temporary Commented..
          // AccessUser.updateOne(
          //   { PersonalUniqueueID: AccessUserRecieved.PersonalUniqueueID },
          //   {
          //     $set: {
          //       FullName: AccessUserRecieved.FullName,
          //       Gender: AccessUserRecieved.Gender,
          //       DateOfBirth: AccessUserRecieved.DateOfBirth,
          //       Age: AccessUserRecieved.Age,
          //       Address: AccessUserRecieved.Address,
          //       City: AccessUserRecieved.City,
          //       State: AccessUserRecieved.State,
          //       PinCode: AccessUserRecieved.PinCode,
          //       PhoneNo: AccessUserRecieved.PhoneNo,
          //       MobileNo: AccessUserRecieved.MobileNo,
          //       PhysicalDisability: AccessUserRecieved.PhysicalDisability,
          //       MaritalStatus: AccessUserRecieved.MaritalStatus,
          //       EducationStatus: AccessUserRecieved.EducationStatus,
          //       BirthSign: AccessUserRecieved.BirthSign
          //     }
          //   },
          //   function(err, res) {
          //     if (!err) {
          //       if (res != null) {
          //         response.send({
          //           data: res,
          //           statusMessage: "User Updated Successful",
          //           statusCode: 200
          //         });
          //       } else {
          //         response.send({ error: "User Updation Failed." });
          //       }
          //     } else {
          //       response.send({ error: err });
          //     }
          //   }
          // );
        } else {
          TempAccessUser.updateOne(
            { _id: _Id },
            {
              $set: {
                FullName: AccessUserRecieved.FullName,
                Gender: AccessUserRecieved.Gender,
                DateOfBirth: AccessUserRecieved.DateOfBirth,
                Age: AccessUserRecieved.Age,
                Address: AccessUserRecieved.Address,
                City: AccessUserRecieved.City,
                State: AccessUserRecieved.State,
                PinCode: AccessUserRecieved.PinCode,
                PhoneNo: AccessUserRecieved.PhoneNo,
                MobileNo: AccessUserRecieved.MobileNo,
                PhysicalDisability: AccessUserRecieved.PhysicalDisability,
                MaritalStatus: AccessUserRecieved.MaritalStatus,
                EducationStatus: AccessUserRecieved.EducationStatus,
                BirthSign: AccessUserRecieved.BirthSign
              }
            },
            function(err, res) {
              if (!err) {
                if (res != null) {
                  response.send({
                    data: res,
                    statusMessage: "User Updated Successful",
                    statusCode: 200
                  });
                } else {
                  response.send({ error: "User Updation Failed." });
                }
              } else {
                response.send({ error: err });
              }
            }
          );
        }
      }
    }
  });
};
//Activate Normal User
AccessUserController.Activate = function(request, response) {
  var AccessUserRecieved = request.body.accessUser;
  var tokenRecived = request.headers.authorization.split(" ")[1];
  var Role = request.headers.role;
  jwt.verify(tokenRecived, app.get("jwtSecret"), function(err, decoded) {
    if (err) {
      response.send({ success: false, message: "Token verification failed" });
    } else {
      request.decoded = decoded;
      if (Role === "1") {
        TempAccessUser.deleteOne({ _id: AccessUserRecieved._id }, function(
          err,
          res
        ) {
          if (!err) {
            if (res != null) {
              //Added Just now
              var AccessUserID = AccessUserRecieved.UserId;
              delete AccessUserRecieved.UserId;
              delete AccessUserRecieved._id;
              AccessUser.create(AccessUserRecieved, function(err, res) {
                if (!err) {
                  if (res != null) {
                    User.findOne(
                      { UserName: AccessUserRecieved.FullName.split("~")[0] },
                      function(err, res) {
                        if (!err) {
                          if (res != null) {
                            //console.log(res);
                          } else {
                            User.create(
                              {
                                UserID: AccessUserID,
                                Email: null,
                                UserName: AccessUserRecieved.FullName.split(
                                  "~"
                                )[0],
                                Password: AccessUserRecieved.FullName.split(
                                  "~"
                                )[2],
                                RoleId: "3",
                                PersonalUniqueueID:
                                  AccessUserRecieved.PersonalUniqueueID
                              },
                              function(err, resp) {
                                if (!err) {
                                  if (resp != null) {
                                    response.send({
                                      data: res,
                                      statusMessage:
                                        "User Activated Successful",
                                      statusCode: 200
                                    });
                                  }
                                }
                              }
                            );
                          }
                        }
                      }
                    );
                  } else {
                    response.send({ error: "User Activation Failed." });
                  }
                } else {
                  response.send({ error: err });
                }
              });
            } else {
              response.send({ error: "User Activation Failed." });
            }
          } else {
            response.send({ error: err });
          }
        });
      }
    }
  });
};

//Geet Normal User Profile
AccessUserController.GetAccessUserProfile = function(request, response) {
  //console.log(request.headers);
  var userName = request.headers.username;
  var tokenRecived = request.headers.authorization.split(" ")[1];
  var Role = request.headers.role;
  jwt.verify(tokenRecived, app.get("jwtSecret"), function(err, decoded) {
    if (err) {
      response.send({ success: false, message: "Token verification failed" });
    } else {
      //console.log("Token verified");
      request.decoded = decoded;
      if (Role === "3") {
        var queryUserRole = User.findOne({
          UserName: userName,
          RoleId: Role
        }).select("-_id -__v -updatedAt -createdAt");
        queryUserRole.exec(function(err, resp) {
          if (!err) {
            if (resp != null) {
              var Obj = new Object();
              Obj.UserID = resp.UserID;
              Obj.UserName = resp.UserName;
              Obj.Email = resp.Email;
              Obj.Password = resp.Password;
              Obj.RoleId = Role;

              var uniqueId = resp.PersonalUniqueueID;
              console.log(uniqueId);
              var queryTempAccessUser = TempAccessUser.findOne({
                PersonalUniqueueID: uniqueId
              }).select("-_id -__v -updatedAt -createdAt");
              queryTempAccessUser.exec(function(err, resp) {
                if (!err) {
                  if (resp != null) {
                    //console.log("In Temp Access Find");
                    response.send({
                      error:
                        "your Profile Needs Approval From Admin As One Of Operator Has Updated Your Profile."
                    });
                  } else {
                    var queryAccessUser = AccessUser.findOne({
                      PersonalUniqueueID: uniqueId
                    }).select("-_id -__v -updatedAt -createdAt");
                    queryAccessUser.exec(function(err, resp) {
                      if (!err) {
                        if (resp != null) {
                          //console.log("In Access Find");
                          var ObjAccessUser = new Object();
                          ObjAccessUser.PersonalUniqueueID =
                            resp.PersonalUniqueueID;
                          ObjAccessUser.FullName = resp.FullName;
                          ObjAccessUser.FirstName = resp.FullName.split("~")[0];
                          ObjAccessUser.MiddleName = resp.FullName.split(
                            "~"
                          )[1];
                          ObjAccessUser.LastName = resp.FullName.split("~")[2];
                          ObjAccessUser.GenderIs = resp.Gender;
                          ObjAccessUser.DateOfBirth = resp.DateOfBirth;
                          ObjAccessUser.Age = resp.Age;
                          ObjAccessUser.Address = resp.Address;
                          ObjAccessUser.FlatOrBungalowNumber = resp.Address.split(
                            "~"
                          )[0];
                          ObjAccessUser.SocietyName = resp.Address.split(
                            "~"
                          )[1];
                          ObjAccessUser.StreetName = resp.Address.split("~")[2];
                          ObjAccessUser.City = resp.City;
                          ObjAccessUser.State = resp.State;
                          ObjAccessUser.PinCode = resp.PinCode;
                          ObjAccessUser.PhoneNo = resp.PhoneNo;
                          ObjAccessUser.MobileNo = resp.MobileNo;
                          ObjAccessUser.IsPhysicalDisability =
                            resp.PhysicalDisability;
                          ObjAccessUser.Married = resp.MaritalStatus;
                          ObjAccessUser.Education = resp.EducationStatus;
                          ObjAccessUser.BirthSign = resp.BirthSign;
                          var FinalObj = { ...Obj, ...ObjAccessUser };

                          response.send({
                            data: FinalObj,
                            statusMessage: "Got User Profile",
                            statusCode: 200
                          });
                        } else {
                          response.send({
                            error: "Getting User Profile Failed.."
                          });
                        }
                      } else {
                        response.send({
                          error: "Getting User Profile Failed.."
                        });
                      }
                    });
                  }
                } else {
                  response.send({ error: "Getting User Profile Failed.." });
                }
              });
            } else {
              response.send({ error: "Getting User Profile Failed.." });
            }
          } else {
            response.send({ error: "Getting User Profile Failed.." });
          }
        });
      }
    }
  });
};
module.exports = AccessUserController;
// PersonalUniqueueID
// :
// "11731"
