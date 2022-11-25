const { Router } = require("express");
const router = Router();

const ctrEmail = require("../controllers/email.controller");

router.post("/send-email", ctrEmail.sendEmail);

router.post("/send-me", ctrEmail.sentMeMail);

router.get("/", (req, res) => {
  res.json("funciona");
});

module.exports = router;
