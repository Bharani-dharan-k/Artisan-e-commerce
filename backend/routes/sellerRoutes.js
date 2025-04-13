const express = require("express");
const { signupSeller, loginSeller } = require("../controllers/sellerController");

const router = express.Router();

router.post("/signup", signupSeller);
router.post("/login", loginSeller);

module.exports = router;
