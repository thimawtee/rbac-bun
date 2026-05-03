import type { Request, Response } from "express";
import {
  getAllPermissions,
  createPermission
} from "../models/permissionModel";

// =====================
// LIST PERMISSIONS
// =====================
export const listPermissions = async (req: any, res: Response) => {
  const permissions = await getAllPermissions();

  res.render("layouts/main", {
    title: "Permissions",
    user: req.session.user,

    body: `
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold">Permissions</h1>

    <a href="/permissions/create"
       class="bg-blue-600 text-white px-4 py-2 rounded">
      + Add Permission
    </a>
  </div>

  <div class="bg-white shadow rounded p-4">
    <table class="w-full border-collapse text-left">
      <thead>
        <tr class="border-b bg-gray-100">
          <th class="p-2 text-left">ID</th>
          <th class="p-2 text-left">Name</th>
          <th class="p-2 text-left">Resource</th>
          <th class="p-2 text-left">Action</th>
        </tr>
      </thead>

      <tbody>
        ${permissions
          .map(
            (p: any) => `
          <tr class="border-b hover:bg-gray-50">
            <td class="p-2 text-left">${p.id}</td>
            <td class="p-2 text-left">${p.name}</td>
            <td class="p-2 text-left">${p.resource}</td>
            <td class="p-2 text-left">${p.action}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>
`
  });
};

// =====================
// CREATE PAGE
// =====================
export const createPermissionPage = (req: any, res: Response) => {
  res.render("layouts/main", {
    title: "Create Permission",
    user: req.session.user,

    body: `
      <h1 class="text-xl font-bold mb-4">Create Permission</h1>

      <form method="POST" action="/permissions"
            class="space-y-3 bg-white p-4 rounded shadow">

        <input name="name" placeholder="user:create"
               class="border p-2 w-full" />

        <input name="resource" placeholder="users"
               class="border p-2 w-full" />

        <input name="action" placeholder="create"
               class="border p-2 w-full" />

        <button class="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>

      </form>
    `
  });
};

// =====================
// STORE PERMISSION
// =====================
export const storePermission = async (req: Request, res: Response) => {
  const { name, resource, action } = req.body;

  if (!name || !resource || !action) {
    return res.send("Semua field wajib diisi");
  }

  await createPermission(name, resource, action);

  res.redirect("/permissions");
};