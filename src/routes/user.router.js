const { Router } = require("express");
const router = Router();
const ROLES_LIST = require("../config/rolesList");

const ctrUser = require("../controllers/user.controller");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

router.get("/", verifyJWT, verifyRoles(ROLES_LIST.user), ctrUser.getUsers);

router.post(
  "/register",
  verifyJWT,
  verifyRoles(ROLES_LIST.admin),
  ctrUser.createUser
);

router.get("/:id", ctrUser.getUser);

router.delete(
  "/:id",
  verifyJWT,
  verifyRoles(ROLES_LIST.admin),
  ctrUser.deleteUser
);

router.put(
  "/:id",
  verifyJWT,
  verifyRoles(ROLES_LIST.admin),
  ctrUser.updateUser
);

module.exports = router;
