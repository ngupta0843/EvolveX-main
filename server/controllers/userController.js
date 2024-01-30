const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "USERNAME",
    pass: "PASSWORD",
  },
});

exports.signup = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password } = req.body;
    // validation
    if (!name) return res.status(400).send("Name is required");
    if (!email) return res.status(400).send("Email is required");
    if (!password || password.length < 6 || password.length > 64)
      return res
        .status(400)
        .send(
          "Password is required and should be between 6 - 64 characters long"
        );
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");

    //register
    const user = new User(req.body);
    await user.save();
    console.log("USER CREATED", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log("CREATE USER FAILED", err);
    return res.status(400).send("Error. Try Again. ");
  }
};

exports.beMentor = async (req, res, next) => {
  const verificationLink = `http://localhost:8080/api/auth/verify-email/${verificationToken}`;
  const options = {
    to: req.body.email,
    from: "events_soccer3001@hotmail.com",
    subject: "Verify your email address",
    html: `
        <p>Hello ${req.body.username},</p>
        <p>Thank you for signing up for our service. Please click the link below to verify being a mentor:</p>
        <p><a href="${verificationLink}">${verificationLink}</a></p>
        <p>This link will expire in one hour.</p>
      `,
  };

  try {
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Sent" + info.response);
    });
  } catch (err) {
    next(err);
  }
};

exports.verifyMentor = async (req, res, next) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      mentorVerificationToken: token,
      mentorVerificationTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token." });
    }

    user.isMentorVerified = true;
    user.mentorVerificationToken = null;
    user.mentorVerificationTokenExpiration = null;
    await user.save();

    res.json({
      message:
        "You have been verified as a mentor. Please continue to the application.",
    });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).exec();
    // console.log('USer exists')
    if (!user) return res.status(400).send("No account with that email");
    console.log("USEERRR->", user);
    var passwordIsValid = bcrypt.compareSync(password, user.password);

    // if (!passwordIsValid) {
    //   return res.status(401).send({
    //     accessToken: null,
    //     message: "Invalid Password!",
    //   });
    // }

    let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        stripe_account_id: user.stripe_account_id,
        stripe_seller: user.stripe_seller,
        stripeSession: user.stripeSession,
      },
    });
    // });
  } catch (err) {
    console.log("LOGIN ERROR", err);
    res.status(400).send("Sign in failed");
  }
};
