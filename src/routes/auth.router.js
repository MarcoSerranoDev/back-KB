const { Router } = require("express");
const router = Router();

const ctrAuth = require("../controllers/auth.controller");

router.post("/login", ctrAuth.login);
router.get("/refreshToken", ctrAuth.refreshToken);
router.get("/logout", ctrAuth.logout);

module.exports = router;
