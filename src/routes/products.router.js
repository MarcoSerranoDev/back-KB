const { Router } = require("express");
const router = Router();

const ctrProduct = require("../controllers/products.controller")

router.get("/", ctrProduct.getProducts);

router.post("/create", ctrProduct.createProduct);

router.get("/:id",ctrProduct.getProduct);

router.put("/:id", ctrProduct.updateProduct);

router.delete("/:id", ctrProduct.deleteProduct);

module.exports = router;