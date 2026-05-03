import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Role Routes OK");
});

export default router;