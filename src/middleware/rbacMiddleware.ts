import type { Request, Response, NextFunction } from "express";
import pool from "../config/database";

export const checkPermission = (required: string) => {
  return async (req: any, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }

    const [rows]: any = await pool.query(
      `
      SELECT p.name FROM users u
      JOIN roles r ON u.role_id = r.id
      JOIN role_permissions rp ON r.id = rp.role_id
      JOIN permissions p ON rp.permission_id = p.id
      WHERE u.id = ?
    `,
      [req.user.id]
    );

    const permissions = rows.map((r: any) => r.name);

    if (permissions.includes(required)) {
      return next();
    }

    return res.status(403).send("Forbidden");
  };
};