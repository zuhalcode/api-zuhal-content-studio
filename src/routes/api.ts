//#region-imports

import express from "express";
import authController from "../controllers/auth.controller";

import { isAuthenticated } from "../middlewares/auth";

import { projectController } from "../modules/project";

//#endregion

const router = express.Router();

// AUTH
router.get("/auth/me", isAuthenticated, authController.me);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);

// PROJECTS
router.get("/projects", isAuthenticated, projectController.findAll);
// router.post("/assets", isAuthenticated, assetController.create);
// router.patch("/assets/:id", isAuthenticated, assetController.update);
// router.delete("/assets/:id", isAuthenticated, assetController.remove);

export default router;
