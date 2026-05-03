import type { Request, Response } from "express";
import { getAllRoles } from "../models/roleModel";
import {
  getAllUsers,
  createUser,
  deleteUser
} from "../models/userModel";

// =====================
// LIST USERS
// =====================
export const listUsers = async (req: any, res: Response) => {
  const users = await getAllUsers();

  res.render("layouts/main", {
    title: "Users",
    user: req.session.user,

    body: `
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Users</h1>

        ${
          req.session.user.role_id !== 3
            ? `
          <a href="/users/create"
             class="bg-blue-600 text-white px-4 py-2 rounded">
            + Add User
          </a>
        `
            : ""
        }
      </div>

      <div class="bg-white shadow rounded p-4">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b">
              <th class="p-2">ID</th>
              <th class="p-2">Username</th>
              <th class="p-2">Role</th>
              <th class="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            ${users
              .map(
                (u: any) => `
              <tr class="border-b">
                <td class="p-2">${u.id}</td>
                <td class="p-2">${u.username}</td>
                <td class="p-2">${u.role_name}</td>

                <td class="p-2">
                  ${
                    req.session.user.role_id !== 3
                      ? `
                    <form method="POST" action="/users/${u.id}?_method=DELETE" onsubmit="return confirm('Yakin hapus user ini?')">
                      <button class="bg-red-600 text-white px-3 py-1 rounded">
                        Delete
                      </button>
                    </form>
                  `
                      : "-"
                  }
                </td>

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
export const createPage = async (req: any, res: any) => {
  const roles = await getAllRoles();

  res.render("layouts/main", {
    title: "Create User",
    user: req.session.user,

    body: `
      <h1 class="text-2xl font-bold mb-4">Create User</h1>

      <form method="POST" action="/users" class="space-y-3 bg-white p-4 rounded shadow">

        <input name="username"
               placeholder="Username"
               class="border p-2 w-full" />

        <input name="password"
               type="password"
               placeholder="Password"
               class="border p-2 w-full" />

        <select name="role_id" class="border p-2 w-full">
          <option value="">-- Pilih Role --</option>

          ${roles
            .map(
              (r: any) => `
              <option value="${r.id}">${r.name}</option>
            `
            )
            .join("")}
        </select>

        <button class="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>

      </form>
    `
  });
};

// =====================
// STORE USER
// =====================
export const storeUser = async (req: Request, res: Response) => {
  const { username, password, role_id } = req.body;

  if (!username || !password || !role_id) {
    return res.send("Semua field wajib diisi");
  }

  const roleIdNumber = Number(role_id);

  if (isNaN(roleIdNumber)) {
    return res.send("Role tidak valid");
  }

  await createUser(username, password, roleIdNumber);

  res.redirect("/users");
};

// =====================
// DELETE USER
// =====================
export const removeUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await deleteUser(id);

  res.redirect("/users");
};