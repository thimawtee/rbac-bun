import type { Request, Response, NextFunction } from "express";

export const requireAuth = (req: any, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  req.user = req.session.user;
  next();
};