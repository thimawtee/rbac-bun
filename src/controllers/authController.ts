import type { Request, Response } from "express";
import pool from "../config/database";

// HALAMAN LOGIN
export const loginPage = (req: Request, res: Response) => {
  res.render("auth/login");
};

// LOGIN PROCESS
export const login = async (req: any, res: Response) => {
  try {
    // AMAN dari undefined error
    const username = req.body?.username;

    if (!username) {
      return res.status(400).send("Username wajib diisi");
    }

    const [rows]: any = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(404).send("User tidak ditemukan");
    }

    // simpan session
    req.session.user = rows[0];

    return res.redirect("/users");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Terjadi kesalahan server");
  }
};

// LOGOUT
export const logout = (req: any, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

