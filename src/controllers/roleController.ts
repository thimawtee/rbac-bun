import type { Request, Response } from "express";
import { getAllRoles, createRole } from "../models/roleModel";

// =====================
// LIST ROLES
// =====================
export const listRoles = async (req: any, res: Response) => {
  const roles = await getAllRoles();

  res.render("layouts/main", {
    title: "Roles",
    user: req.session.user,

    body: `
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold">Roles</h1>

    <a href="/roles/create"
       class="bg-blue-600 text-white px-4 py-2 rounded">
      + Add Role
    </a>
  </div>

  <div class="bg-white shadow rounded p-4">
    <table class="w-full border-collapse text-left">
      <thead>
        <tr class="border-b bg-gray-100">
          <th class="p-2 text-left">ID</th>
          <th class="p-2 text-left">Name</th>
        </tr>
      </thead>

      <tbody>
        ${roles
          .map(
            (r: any) => `
          <tr class="border-b hover:bg-gray-50">
            <td class="p-2 text-left">${r.id}</td>
            <td class="p-2 text-left">${r.name}</td>
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
export const createRolePage = (req: any, res: Response) => {
  res.render("layouts/main", {
    title: "Create Role",
    user: req.session.user,

    body: `
      <h1 class="text-xl font-bold mb-4">Create Role</h1>

      <form method="POST" action="/roles" class="space-y-3 bg-white p-4 rounded shadow">

        <input name="name"
               placeholder="Role Name"
               class="border p-2 w-full" />

        <button class="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>

      </form>
    `
  });
};

// =====================
// STORE ROLE
// =====================
export const storeRole = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) return res.send("Nama role wajib diisi");

  await createRole(name);

  res.redirect("/roles");
};