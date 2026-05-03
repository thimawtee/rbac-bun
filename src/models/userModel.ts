import pool from "../config/database";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  role_id: number;
  role_name?: string;
}

// =====================
// GET ALL USERS
// =====================
export const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await pool.query<User[] & RowDataPacket[]>(
    `
    SELECT users.id, username, role_id, roles.name AS role_name
    FROM users
    JOIN roles ON users.role_id = roles.id
    `
  );

  return rows as User[];
};

// =====================
// CREATE USER
// =====================
export const createUser = async (
  username: string,
  password: string,
  role_id: number
) => {
  return await pool.query<ResultSetHeader>(
    "INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)",
    [username, password, role_id]
  );
};

// =====================
// DELETE USER
// =====================
export const deleteUser = async (id: number) => {
  return await pool.query<ResultSetHeader>(
    "DELETE FROM users WHERE id = ?",
    [id]
  );
};