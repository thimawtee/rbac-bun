import pool from "../config/database";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Role extends RowDataPacket {
  id: number;
  name: string;
}

// =====================
// GET ALL ROLES
// =====================
export const getAllRoles = async (): Promise<Role[]> => {
  const [rows] = await pool.query<Role[]>("SELECT * FROM roles");
  return rows;
};

// =====================
// CREATE ROLE (INI YANG KURANG)
// =====================
export const createRole = async (name: string) => {
  return await pool.query<ResultSetHeader>(
    "INSERT INTO roles (name) VALUES (?)",
    [name]
  );
};