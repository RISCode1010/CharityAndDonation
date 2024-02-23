const express = require('express');

const{auth, isDonor} = require("../middleware/auth")

const userCtrl = require('../controllers/userController.js');


const router = express.Router();

// routes
router.route("/Register").post(userCtrl.register);
router.route("/Login").post(userCtrl.Login);
router.route("/Logout").get(auth,userCtrl.logout);
router.route("/updatePassword").put(auth,userCtrl.updatePassword);

module.exports = router;