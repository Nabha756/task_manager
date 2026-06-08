const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

const validationMiddleware = require(
  "../middleware/validationMiddleware"
);

router.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .isEmail()
      .withMessage("Valid email required"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validationMiddleware,
  register
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Valid email required"),

    body("password")
      .notEmpty()
      .withMessage("Password required"),
  ],
  validationMiddleware,
  login
);

module.exports = router;