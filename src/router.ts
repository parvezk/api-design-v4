import { Router } from "express";
import { body, oneOf } from "express-validator";
import { handleinputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
} from "./handlers/product";
import {
  getUpdates,
  getOneUpdate,
  updateUpdate,
  createUpdate,
  deleteUpdate,
} from "./handlers/update";
const router = Router();

/**
 * Product
 */
/* router.get("/product", (req, res) => {
  res.json({ message: "hello" });
  // res.json({ message: req.shhh_secret });
}); */
router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.post(
  "/product",
  body("name").isString(),
  handleinputErrors,
  createProduct,
  (req, res) => {}
);

router.put(
  "/product/:id",
  body("name").isString(),
  handleinputErrors,
  (req, res) => {}
);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getUpdates);

router.get("/update/:id", getOneUpdate);

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
  updateUpdate
);

router.delete("/update/:id", deleteUpdate);

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  (req, res) => {}
);

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  (req, res) => {}
);

router.delete("/updatepoint/:id", (req, res) => {});

//  because the error tested happened in sub-router, they did not go through the usual next(error) method for error handling
// because all the resources that aren't user in the sub router, ther errors aren't gonna bubble up to the main router's error handling
// so if you have a subrouter, you also have to add an error handler to that router at the bottom of those routes as well
router.use((err, req, res, next) => {
  console.log(err);
  res.json({ message: "in router handler" });
});

export default router;
