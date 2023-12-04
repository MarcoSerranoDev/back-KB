const { Router } = require("express");
const router = Router();

const ctrProduct = require("../controllers/products.controller");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/rolesList");

router.get("/", ctrProduct.getProducts);

router.post(
  "/create",
  verifyJWT,
  verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor),
  ctrProduct.createProduct
);

router.get("/:id", ctrProduct.getProduct);

router.put(
  "/:id",
  verifyJWT,
  verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor),
  ctrProduct.updateProduct
);

router.delete(
  "/:id",
  verifyJWT,
  verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor),
  ctrProduct.deleteProduct
);

module.exports = router;
