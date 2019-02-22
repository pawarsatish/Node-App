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

//Get Normal User
AccessUserController.Approve = function(request, response) {
  //JSON.stringify(obj1) === JSON.stringify(obj2)
  var accessUser = request.body.accessUser;
  var tokenRecived = request.headers.authorization.split(" ")[1];
  //var Role = request.headers.role;
  jwt.verify(tokenRecived, app.get("jwtSecret"), function(err, decoded) {
    if (err) {
      response.send({ success: false, message: "Token verification failed" });
    } else {
      request.decoded = decoded;
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
  });
};
AccessUserController.SearchAccessUser = function(request, response) {
  var tokenRecived = request.headers.authorization.split(" ")[1];
  var Criteria = request.headers.criteria;
  jwt.verify(tokenRecived, app.get("jwtSecret"), function(err, decoded) {
    if (err) {
      response.send({ success: false, message: "Token verification failed" });
    } else {
      request.decoded = decoded;
      var returnedAccessUserObjects = [];
      //find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
      //var criteria = "/.*" + Criteria + ".*/";
      var queryAccessUser = AccessUser.find({
        MobileNo: Criteria
      }).select("-_id -__v -updatedAt");
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
            response.send({
              data: returnedAccessUserObjects
            });
          }
        }
      });
    }
  });
};
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
  jwt.verify(tokenRecived, app.get("jwtSecret"), function(err, decoded) {
    if (err) {
      response.send({ success: false, message: "Token verification failed" });
    } else {
      request.decoded = decoded;
      if (Role === "1") {
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
      } else {
        TempAccessUser.create(accessUser, function(err, res) {
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
                  TempAccessUser.create(AccessUserRecieved, function(err, res) {
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
              delete AccessUserRecieved._id;

              AccessUser.create(AccessUserRecieved, function(err, res) {
                if (!err) {
                  if (res != null) {
                    response.send({
                      data: res,
                      statusMessage: "User Activated Successful",
                      statusCode: 200
                    });
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

//Delete Normal User
AccessUserController.Delete = function(request, response) {
  // var user = {
  //     UserName: request.body.UserName,
  //     PassWord: request.body.PassWord
  // }
  // AccessUser.create(user);
};
module.exports = AccessUserController;
