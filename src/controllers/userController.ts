import type { Request, Response } from "express";
import pool from "../config/database";

// LIST USERS
export const listUsers = async (req: Request, res: Response) => {
  const [users] = await pool.query(`
    SELECT users.id, username, role_id, roles.name as role_name
    FROM users
    JOIN roles ON users.role_id = roles.id
  `);

  res.render("users/list", { users });
};

// CREATE USER
export const storeUser = async (req: Request, res: Response) => {
  const { username, password, role_id } = req.body;

  await pool.query(
    "INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)",
    [username, password, role_id]
  );

  res.redirect("/users");
};

// DELETE USER
export const removeUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await pool.query("DELETE FROM users WHERE id = ?", [id]);

  res.redirect("/users");
};