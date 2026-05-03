import { Router } from "express";
import {
  listPermissions,
  createPermissionPage,
  storePermission
} from "../controllers/permissionController";

const router = Router();

router.get("/", listPermissions);
router.get("/create", createPermissionPage);
router.post("/", storePermission);

export default router;