import type { Request, Response } from "express";
import {
  getAllPermissions,
  createPermission
} from "../models/permissionModel";

export const listPermissions = async (req: any, res: Response) => {
  const permissions = await getAllPermissions();

  res.render("permissions/list", {
    permissions,
    user: req.session.user
  });
};

export const createPermissionPage = (req: any, res: Response) => {
  res.render("permissions/create", {
    user: req.session.user
  });
};

export const storePermission = async (req: Request, res: Response) => {
  const { name, resource, action } = req.body;

  await createPermission(name, resource, action);

  res.redirect("/permissions");
};