const jwt = require("jsonwebtoken");
const User = require("../models/user");

//auth
exports.auth = async (req, res, next) => {
  try {
    console.log("BEFORE ToKEN EXTRACTION");
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer ", "");

    console.log("AFTER ToKEN EXTRACTION");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded Data: ",decoded);
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

exports.isDonor = async (req, res, next) => {
  try {
    if (req.user.role !== "donor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Donor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Role cannot be verified, please try again",
    });
  }
};

exports.isOrganization = async (req, res, next) => {
  try {
    if (req.user.role !== "organization") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Organization only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Role cannot be verified, please try again",
    });
  }
};

exports.isVolunteer = async (req, res, next) => {
  try {
    if (req.user.role !== "volunteer") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Volunteer only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Role cannot be verified, please try again",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Role cannot be verified, please try again",
    });
  }
};
