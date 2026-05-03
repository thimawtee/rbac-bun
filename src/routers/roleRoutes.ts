import { Router } from "express";
import {
  listRoles,
  createRolePage,
  storeRole
} from "../controllers/roleController";

const router = Router();

router.get("/", listRoles);
router.get("/create", createRolePage);
router.post("/", storeRole);

export default router;