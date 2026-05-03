import type { Request, Response } from "express";
import pool from "../config/database";

export const loginPage = (req: Request, res: Response) => {
  res.render("auth/login");
};

export const login = async (req: any, res: Response) => {
  const { username } = req.body || {};

  if (!username) {
    return res.send("Username wajib diisi");
  }

  const [rows]: any = await pool.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (rows.length === 0) {
    return res.send("User tidak ditemukan");
  }

  req.session.user = rows[0];

  res.redirect("/users");
};

export const logout = (req: any, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};