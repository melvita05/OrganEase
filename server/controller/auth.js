const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class Auth {
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch {
      res.status(404);
    }
  }

  async allUser(req, res) {
    try {
      let allUser = await userModel.find({});
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
  let { name, email, password, cPassword, phone, address } = req.body;
  let error = {};

  // Check empty fields
  if (!name || !email || !password || !cPassword || !phone || !address) {
    error = {
      ...error,
      name: !name ? "Field must not be empty" : "",
      email: !email ? "Field must not be empty" : "",
      password: !password ? "Field must not be empty" : "",
      cPassword: !cPassword ? "Field must not be empty" : "",
      phone: !phone ? "Field must not be empty" : "",
      address: !address ? "Field must not be empty" : "",
    };
    return res.json({ error });
  }

  // Name validation
  if (name.length < 3 || name.length > 25) {
    error = { ...error, name: "Name must be 3-25 characters" };
    return res.json({ error });
  }

  // Phone validation (10 digits)
  if (!/^[0-9]{10}$/.test(phone)) {
    error = { ...error, phone: "Phone number must be 10 digits" };
    return res.json({ error });
  }

  // Address validation
  if (address.length < 5) {
    error = { ...error, address: "Address must be at least 5 characters" };
    return res.json({ error });
  }

  // Email validation
  if (validateEmail(email)) {
    name = toTitleCase(name);

    // Password validation
    if (password.length > 255 || password.length < 8) {
      error = {
        ...error,
        password: "Password must be at least 8 characters",
        name: "",
        email: "",
      };
      return res.json({ error });
    }

    // Confirm password validation
    if (password !== cPassword) {
      error = {
        ...error,
        password: "Passwords do not match",
        cPassword: "Passwords do not match",
      };
      return res.json({ error });
    }

    try {
      const data = await userModel.findOne({ email: email });
      if (data) {
        error = {
          ...error,
          password: "",
          name: "",
          email: "Email already exists",
        };
        return res.json({ error });
      } else {
        password = bcrypt.hashSync(password, 10);

        let newUser = new userModel({
          name,
          email,
          password,
          phone,
          address,
          // role 1 = Procurement, role 0 = Hospital
          userRole: 1,
        });

        newUser
          .save()
          .then((data) => {
            return res.json({
              success: "Account created successfully. Please login",
            });
          })
          .catch((err) => {
            console.log(err);
            return res.json({
              error: "Something went wrong while saving user",
            });
          });
      }
    } catch (err) {
      console.log(err);
      return res.json({
        error: "Server error",
      });
    }
  } else {
    error = {
      ...error,
      password: "",
      name: "",
      email: "Email is not valid",
    };
    return res.json({ error });
  }
}
  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
            { _id: data._id, role: data.userRole },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: "Invalid email or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const authController = new Auth();
module.exports = authController;
