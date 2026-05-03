import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Permission Routes OK");
});

export default router;