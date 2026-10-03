//#region-imports

import express from "express";
import authController from "../controllers/auth.controller";

import assetBalanceController from "../controllers/asset-balance.controller";

import { isAuthenticated } from "../middlewares/auth";

import multer from "multer";
import imageKit from "../libs/imagekit";

import { assetTransactionController } from "../modules/asset-transaction";
import { capitalController } from "../modules/capital";
import { assetController } from "../modules/asset";
import trashController from "../modules/trash/trash.controller";
import productController from "../modules/product/product.controller";
import { productCategoryController } from "../modules/product-category";
import { backupController } from "../modules/backup";

//#endregion

const router = express.Router();
const upload = multer();

// AUTH
router.get("/auth/me", isAuthenticated, authController.me);

// BACKUP
router.get("/backups", isAuthenticated, backupController.backupDatabase);

// ASSETS
router.get("/assets", isAuthenticated, assetController.findAll);
router.post("/assets", isAuthenticated, assetController.create);
router.patch("/assets/:id", isAuthenticated, assetController.update);
router.delete("/assets/:id", isAuthenticated, assetController.remove);

// ASSET TRANSACTIONS
router.get(
  "/asset-transactions",
  isAuthenticated,
  assetTransactionController.findAll,
);

router.post(
  "/asset-transactions",
  isAuthenticated,
  assetTransactionController.create,
);

router.patch(
  "/asset-transactions/:id",
  isAuthenticated,
  assetTransactionController.update,
);

router.delete(
  "/asset-transactions/:id",
  isAuthenticated,
  assetTransactionController.remove,
);

// ASSET BALANCES
router.get("/asset-balances", isAuthenticated, assetBalanceController.findAll);

// CAPITALS
router.get("/capitals", isAuthenticated, capitalController.findAll);
router.post("/capitals", isAuthenticated, capitalController.create);
router.patch("/capitals/:id", isAuthenticated, capitalController.update);
router.delete("/capitals/:id", isAuthenticated, capitalController.remove);

// PRODUCTS
router.get("/products", isAuthenticated, productController.findAll);
router.post(
  "/products",
  isAuthenticated,
  // upload.single("image"),
  productController.create,
);
router.patch("/products/:id", isAuthenticated, productController.update);
router.delete("/products/:id", isAuthenticated, productController.remove);

// PRODUCT CATEGORIES
router.get(
  "/product-categories",
  isAuthenticated,
  productCategoryController.findAll,
);

// TRASH
router.get("/trash", isAuthenticated, trashController.findAll);
router.post("/trash/:resource/:id", isAuthenticated, trashController.restore);
router.delete("/trash/:resource/:id", isAuthenticated, trashController.destroy);

// IMAGEKIT AUTH
router.get("/imagekit-auth", isAuthenticated, (_, res) => {
  try {
    const authParams = imageKit.getAuthenticationParameters();
    return res.json(authParams);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to get ImageKit auth parameters." });
  }
});

export default router;
