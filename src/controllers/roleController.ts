import type { Request, Response } from "express";
import { getAllRoles, createRole } from "../models/roleModel";

// 🔥 TAMBAHKAN TYPE ANY DI REQUEST
export const listRoles = async (req: any, res: Response) => {
  const roles = await getAllRoles();

  res.render("roles/list", {
    roles,
    user: req.session.user // sudah aman
  });
};

export const createRolePage = (req: any, res: Response) => {
  res.render("roles/create", {
    user: req.session.user
  });
};

export const storeRole = async (req: Request, res: Response) => {
  const { name } = req.body;

  await createRole(name);

  res.redirect("/roles");
};