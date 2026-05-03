import type { Request, Response, NextFunction } from "express";
import pool from "../config/database";

export const checkPermission = (requiredPermission: string) => {
  return async (req: any, res: Response, next: NextFunction) => {
    // 🔥 FIX: pakai session, bukan req.user
    const userId = req.session?.user?.id;

    if (!userId) {
      return res.status(401).send("Unauthorized - silakan login");
    }

    const [rows] = await pool.query(
      `
      SELECT p.name FROM users u
      JOIN roles r ON u.role_id = r.id
      JOIN role_permissions rp ON r.id = rp.role_id
      JOIN permissions p ON rp.permission_id = p.id
      WHERE u.id = ?
      `,
      [userId]
    );

    const permissions = (rows as any[]).map((r) => r.name);

    if (permissions.includes(requiredPermission)) {
      return next();
    }

    return res.status(403).send({
      message: "Forbidden - insufficient permissions",
      required: requiredPermission,
      yourPermissions: permissions
    });
  };
};