const express = require('express');

const{auth, isOrganization} = require("../middleware/auth")

const orgCtrl = require('../controllers/organizationController');

const router = express.Router();

// routes
router.route("/Register").post(orgCtrl.registerOrganization);
router.route("/Login").post(orgCtrl.organizationLogin);

router.route("/createCampaign").post(auth,isOrganization,orgCtrl.createCampaign);


module.exports = router;