const Service = require("../models/service");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const fs = require("fs");

exports.create = async (req, res) => {
  // console.log('reg fields', req.fields)
  // console.log("reg fiesdfdfsfdslds", req.files);
  try {
    let fields = req.fields;
    let files = req.files;

    let service = new Service(fields);

    // if (files.image) {
    //   service.image.data = fs.readFileSync(files.image.path);
    //   service.image.contentType = files.image.type;
    // }

    service.save((err, result) => {
      if (err) {
        console.log("service err", err);
        res.status(400).send("All fields are required");
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.services = async (req, res) => {
  let all = await Service.find({})
    .limit(24)
    // .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(all);
  res.json(all);
};

exports.sellerServices = async (req, res) => {
  let all = await Service.find()
    // .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(all);
  res.send(all);
};

exports.remove = async (req, res) => {
  let removed = await Service.findByIdAndDelete(req.params.serviceId)
    // .select("-image.data")
    .exec();
  res.json(removed);
};

exports.read = async (req, res) => {
  let service = await Service.findById(req.params.serviceId)
    .populate("postedBy", "_id name")
    // .select("-image.data")
    .exec();
  console.log("SINGLE SERRVVVICCEEE ------>", service);
  res.json(service);
};

exports.update = async (req, res) => {
  // console.log('reg fields', req.fields)
  // console.log("reg fiesdfdfsfdslds", req.files);
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };

    let updated = await Service.findByIdAndUpdate(req.params.serviceId, data, {
      new: true,
    })
      // .select("-image.data")
      .exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error updating service. Please try again.");
  }
};

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vawesomeveshi6@gmail.com",
    pass: "VaweSomE05@",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

exports.msgPoster = async (req, res) => {

  const name = "EvolveX";
  const person_email = "visheshv05@gmail.com";
  const person_name = "Vishesh Verma";
  const email = "visheshv05@gmail.com";
  const message =
    "Email your soon-to-be mentor in order to start the mentoring process";
  const mail = {
    from: name,
    to: email,
    subject: "Someone Wants To Mentor You",
    html: `<h5>Hi ${person_name}, Vawesome on EvolveX wants to mentor you.</h5>
           <h5>This is their email: ${person_email}</h5>
           <h5>${message}</h5>`,
  };

  // const service = await Service.findByIdAndUpdate(req.params.serviceId, {
  //   data,
  // }).exec();

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
};
