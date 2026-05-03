import type { Request, Response, NextFunction } from "express";
import pool from "../config/database";

interface AuthRequest extends Request {
  user?: { id: number; role_id: number };
}

export const checkPermission = (requiredPermission: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // =========================
      // 🔥 DEV MODE FALLBACK USER
      // =========================
      // karena belum ada login system
      if (!req.user) {
        req.user = {
          id: 1,        // pastikan user id 1 ada di DB
          role_id: 1    // pastikan role admin = 1
        };
      }

      const userId = req.user.id;

      // =========================
      // GET PERMISSIONS FROM DB
      // =========================
      const [rows] = await pool.query(
        `
        SELECT p.name 
        FROM users u
        JOIN roles r ON u.role_id = r.id
        JOIN role_permissions rp ON r.id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE u.id = ?
        `,
        [userId]
      );

      const permissions = (rows as any[]).map((r) => r.name);

      console.log("User permissions:", permissions); // debug penting

      // =========================
      // CHECK PERMISSION
      // =========================
      if (permissions.includes(requiredPermission)) {
        return next();
      }

      return res.status(403).send({
        message: "Forbidden - insufficient permissions",
        required: requiredPermission,
        yourPermissions: permissions,
      });

    } catch (error) {
      console.error("RBAC Middleware Error:", error);
      return res.status(500).send("Internal Server Error");
    }
  };
};