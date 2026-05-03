import { Router } from "express";
import {
  listUsers,
  storeUser,
  removeUser,
  createPage
} from "../controllers/userController";
import { checkPermission } from "../middleware/rbacMiddleware";

const router = Router();

router.get("/", checkPermission("user:view"), listUsers);
router.get("/create", checkPermission("user:create"), createPage);
router.post("/", checkPermission("user:create"), storeUser);
router.post("/:id", checkPermission("user:delete"), removeUser);

export default router;