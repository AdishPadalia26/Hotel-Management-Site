const express = require("express");
const bodyParser = require("body-parser");
var JSAlert = require("js-alert");
const path = require("path");
var mysql = require("mysql2");
const app = express();
app.use(express.static("public"));
const { queryDB } = require("./database.js");
const { urlencoded } = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
var eID;
var index = -1;
var count = -1;
var empID = [];
var empName = [];
var empGender = [];
var empAge = [];
var empSalary = [];
var empPost = [];
var empPhoneNumber = [];
var DateOfJoin = [];
var cID = [];
var cName = [];
var cAge = [];
var cMail = [];
var cPhoneNumber = [];
var cIn = [];
var cOut = [];
var rId = [];
var rType = [];
var roomId = [];
var roomType = [];
var roomCharge = [];
var roomNumber = [];
var MID;
var f = 0;
var Mpass;
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.get("/sign-up.html", function (req, res) {
  res.sendFile(__dirname + "/sign-up.html");
});
app.get("/main.html", function (req, res) {
  res.sendFile(__dirname + "/main.html");
});
app.get("/employee.html", function (req, res) {
  if (empID.length === 0) {
    queryDB("select * from employee").then(function (result) {
      for (var i = 0; i < result.length; i++) {
        empID.push(result[i].employee_id);
        empName.push(result[i].firstname + " " + result[i].lastname);
        empGender.push(result[i].gender);
        empAge.push(result[i].age);
        empSalary.push(result[i].salary);
        empPost.push(result[i].post);
        empPhoneNumber.push(result[i].phone_no);
        DateOfJoin.push(result[i].date_of_join);
      }
    });
  }
  if (f === 1) {
    queryDB("select * from employee where employee_id=" + eID).then(function (
      result
    ) {
      empID.push(result[0].employee_id);
      empName.push(result[0].firstname + " " + result[0].lastname);
      empGender.push(result[0].gender);
      empAge.push(result[0].age);
      empSalary.push(result[0].salary);
      empPost.push(result[0].post);
      empPhoneNumber.push(result[0].phone_no);
      DateOfJoin.push(result[0].date_of_join);
      f = 0;
    });

    res.render("employee", {
      Emp: empID,
      Name: empName,
      Gender: empGender,
      Age: empAge,
      Post: empPost,
      Salary: empSalary,
      Phone: empPhoneNumber,
      Datejoin: DateOfJoin,
    });
  }

  res.render("employee", {
    Emp: empID,
    Name: empName,
    Gender: empGender,
    Age: empAge,
    Post: empPost,
    Salary: empSalary,
    Phone: empPhoneNumber,
    Datejoin: DateOfJoin,
  });
});

app.get("/customer.html", function (req, res) {
  if (cID.length === 0) {
    queryDB(
      "select c.customer_id,c.firstname,c.middlename,c.lastname,c.phone,c.age,c.mail_id,b.check_in,b.check_out,b.cus_room_id as room_id,r.room_no,r.room_type,r.room_charge  from booked b inner join customer c on b.cus_id= c.customer_id inner join room r on b.cus_room_id=r.room_id"
    ).then(function (result) {
      for (var i = 0; i < result.length; i++) {
        cID.push(result[i].customer_id);
        cName.push(result[i].firstname + " " + result[i].lastname);
        cAge.push(result[i].age);
        cMail.push(result[i].mail_id);
        cIn.push(result[i].check_in);
        cOut.push(result[i].check_out);
        cPhoneNumber.push(result[i].phone);
        rId.push(result[i].room_id);
        rType.push(result[i].room_type);
      }
    });
  }

  res.render("customer", {
    Cus: cID,
    CName: cName,
    CAge: cAge,
    CPhone: cPhoneNumber,
    Mail: cMail,
    In: cIn,
    Out: cOut,
    RoomId: rId,
    RoomType: rType,
  });
});
app.get("/rooms.html", function (req, res) {
  if (roomId.length === 0) {
    queryDB("select * from room").then(function (result) {
      for (var i = 0; i < result.length; i++) {
        roomId.push(result[i].room_id);
        roomNumber.push(result[i].room_no);
        roomType.push(result[i].room_type);
        roomCharge.push(result[i].room_charge);
      }
    });
  }

  res.render("rooms", {
    rId: roomId,
    rtype: roomType,
    rNumber: roomNumber,
    rcharge: roomCharge,
  });
});
app.get("/billing.html", function (req, res) {
  res.sendFile(__dirname + "/billing.html");
});
app.get("/bill.html", function (req, res) {
  res.sendFile(__dirname + "/bill.html");
});
app.post("/billing.html", function (req, res) {
  queryDB("select * from billing where customer_id=" + req.body.Id).then(
    function (result) {
      var cId = result[0].customer_id;
      // console.log(result[0]);
      var cName =
        result[0].firstname +
        " " +
        result[0].middlename +
        " " +
        result[0].lastname;
      var cPhone = result[0].phone;
      var cAge = result[0].age;
      var email = result[0].mail_id;
      var sName = result[0].service_name;
      var rType = result[0].room_type;
      var rcharge = result[0].room_charge;
      var scharge = result[0].service_charge;
      var cIn = result[0].check_in;
      var cOut = result[0].check_out;
      var total = result[0].Name_exp_12;
      var method = result[0].pay_meth;
      res.render("bill", {
        cusId: cId,
        cusName: cName,
        cusPhone: cPhone,
        cusAge: cAge,
        cusEmail: email,
        sName: sName,
        sCharge: scharge,
        roomType: rType,
        roomCharge: rcharge,
        checkIn: cIn,
        checkOut: cOut,
        Total1: total,
        pMethod: method,
      });
    }
  );
});
app.get("/add_employee.html", function (req, res) {
  res.sendFile(__dirname + "/add_employee.html");
});
app.get("/booking.html", function (req, res) {
  res.sendFile(__dirname + "/booking.html");
});
app.get("/delete.html", function (req, res) {
  res.sendFile(__dirname + "/delete.html");
});
app.get("/delete_employee.html", function (req, res) {
  res.sendFile(__dirname + "/delete_employee.html");
});

app.post("/delete_employee.html", function (req, res) {
  var employeeId = req.body.Id;
  queryDB(
    "delete from employee where employee_id=" + "'" + employeeId + "'"
  ).then(function (result) {
    empID = [];
    empName = [];
    empGender = [];
    empAge = [];
    empSalary = [];
    empPost = [];
    empPhoneNumber = [];
    DateOfJoin = [];
    res.redirect("/employee.html");
  });
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000.");
});

// app.get("/test",function(req,res){

// })

app.post("/", function (req, res) {
  var username = req.body.LoginId;
  var password = req.body.password;
  var flag = 1;
  queryDB("select * from manager order by manager_id").then(function (result) {
    for (var i = 0; i < result.length; i++) {
      if (
        username == result[i].mail_id &&
        password == result[i].mang_password
      ) {
        flag = 0;
        res.redirect("/main.html");
      }
    }
    if (flag === 1) {
      res.redirect("/");
    }
  });
});

app.post("/add_employee.html", function (req, res) {
  var efname = req.body.fname;
  var eMname = req.body.Mname;
  var elname = req.body.lname;
  eID = "'" + req.body.Id + "'";
  var ePost = req.body.post;
  var ePhone = req.body.phoneNo;
  var eAge = req.body.age;
  var DateJoin = req.body.datef;
  if (req.body.male === "on") {
    var gender = "M";
  } else {
    var gender = "F";
  }

  queryDB(
    "insert into employee values" +
      "(" +
      eID +
      "," +
      "'" +
      efname +
      "'," +
      "'" +
      eMname +
      "'," +
      "'" +
      elname +
      "'," +
      "'" +
      gender +
      "'," +
      "'" +
      ePhone +
      "'," +
      eAge +
      "," +
      50000 +
      ",'" +
      ePost +
      "'," +
      "'" +
      DateJoin +
      "')"
  );
  f = 1;

  res.redirect("/employee.html");
});

app.get("/add_customer.html", function (req, res) {
  res.sendFile(__dirname + "/add_customer.html");
});
app.post("/add_customer.html", function (req, res) {
  var descr;
  if (req.body.taxi === "on") {
    var services = "taxi service";
    var charge = 1000;
    descr = "The taxi will drop you from hotel to airport";
  } else if (req.body.gym === "on") {
    var services = "GYM";
    var charge = 1500;
    descr = "GYM is well equipped with world class amenities";
  } else if (req.body.cab === "on") {
    var services = "tourism cab";
    var charge = 4000;
    descr = "The cab will provide 12 hours of tourism service";
  } else if (req.body.bus === "on") {
    var services = "tourism bus";
    var charge = 3000;
    descr = "The bus will provide 12 hours of tourism service";
  } else {
    var services = "Spa and sauna";
    var charge = 7000;
    descr =
      "The spa and sauna will give you a refreshing service in natural environment";
  }

  queryDB("select * from room where room_type='" + req.body.rtype + "'").then(
    function (result) {
      console.log(1);
      var roomId = result[0].room_id;
      queryDB(
        "insert into booked values" +
          "('" +
          req.body.checkIn +
          "'," +
          "'" +
          req.body.checkOut +
          "'," +
          "'" +
          req.body.Id +
          "'," +
          "'" +
          roomId +
          "')"
      );
    }
  );
  queryDB(
    "insert into customer values" +
      "(" +
      req.body.Id +
      "," +
      "'" +
      req.body.fname +
      "'," +
      "'" +
      req.body.Mname +
      "'," +
      "'" +
      req.body.lname +
      "'," +
      "'" +
      req.body.phoneNo +
      "'," +
      "" +
      req.body.age +
      ",'" +
      req.body.email +
      "')"
  );
  queryDB(
    "insert into service values" +
      "(" +
      5 +
      "," +
      "'" +
      services +
      "'," +
      "" +
      charge +
      "," +
      "'" +
      descr +
      "'," +
      req.body.Id +
      ")"
  );
  queryDB(
    "insert into payment values" +
      "('" +
      req.body.checkOut +
      "'," +
      "230" +
      req.body.Id +
      "," +
      "'" +
      req.body.payment +
      "'," +
      "" +
      req.body.Id +
      "," +
      1000 +
      ")"
  );
  queryDB("insert into something values(1)");

  cID = [];
  cName = [];
  cAge = [];
  cMail = [];
  cPhoneNumber = [];
  cIn = [];
  cOut = [];
  rId = [];
  rType = [];
  roomId = [];
  roomType = [];
  roomCharge = [];
  roomNumber = [];
  console.log(2);
  res.redirect("/customer.html");
});

app.post("/delete.html", function (req, res) {
  var cId = req.body.Id;
  queryDB("delete from booked where cus_id=" + "'" + cId + "'");
  queryDB("delete from service where cus_id=" + "'" + cId + "'");
  queryDB("delete from payment where cus_id=" + "'" + cId + "'");
  queryDB("delete from customer where customer_id=" + "'" + cId + "'");
  cID = [];
  cName = [];
  cAge = [];
  cMail = [];
  cPhoneNumber = [];
  cIn = [];
  cOut = [];
  rId = [];
  rType = [];
  roomId = [];
  roomType = [];
  roomCharge = [];
  roomNumber = [];
  console.log(2);
  res.redirect("/customer.html");
});
