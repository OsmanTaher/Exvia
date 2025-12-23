"use client";
import { useEffect, useState } from "react";
import { User, Trash2, Edit, Plus, Save, X } from "lucide-react";

interface UserType {
  _id: string;
  code: string;
  name: string;
  role: string;
  password?: string;
  grade?: string;
  department?: string;
  academicDegree?: string;
  age?: number;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const initialFormState = {
    code: "",
    name: "",
    password: "123456",
    role: "student",
    grade: "1",
    department: "IS",
    academicDegree: "",
    age: "",
  };

  const [form, setForm] = useState(initialFormState);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (isMounted) {
          setUsers(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `/api/users/${isEditing}` : "/api/users";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.message);
        return;
      }

      setForm(initialFormState);
      setIsEditing(null);
      fetchUsers();
      alert(isEditing ? "User Updated Successfully" : "User Added Successfully");
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      fetchUsers();
    }
  };

  const handleEdit = (user: UserType) => {
    setForm({
      code: user.code,
      name: user.name,
      password: user.password || "",
      role: user.role,
      grade: user.grade || "1",
      department: user.department || "IS",
      academicDegree: user.academicDegree || "",
      age: user.age ? user.age.toString() : "",
    });
    setIsEditing(user._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <User className="w-8 h-8 text-blue-600" />
          Admin Dashboard
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            {isEditing ? (
              <Edit className="w-5 h-5 text-yellow-500" />
            ) : (
              <Plus className="w-5 h-5 text-blue-500" />
            )}
            {isEditing ? "Edit User" : "Add New User"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Code (Ex: 2024001)"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Password"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <select
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="professor">Professor</option>
              <option value="admin">Admin</option>
            </select>

            {form.role === "student" && (
              <select
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value })}
              >
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
              </select>
            )}

            {(form.role === "student" || form.role === "professor") && (
              <select
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              >
                <option value="IS">IS</option>
                <option value="CS">CS</option>
                <option value="IT">IT</option>
                <option value="General">General</option>
              </select>
            )}

            {form.role === "professor" && (
              <>
                <input
                  type="text"
                  placeholder="Academic Degree (e.g. PhD)"
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.academicDegree}
                  onChange={(e) =>
                    setForm({ ...form, academicDegree: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Age"
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </>
            )}

            <div className="md:col-span-2 lg:col-span-3 flex gap-3 mt-2">
              <button
                type="submit"
                className={`flex-1 py-3 rounded-lg font-bold text-white transition flex justify-center items-center gap-2 ${
                  isEditing
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isEditing ? (
                  <>
                    <Save className="w-5 h-5" /> Update User
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" /> Add User
                  </>
                )}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(null);
                    setForm(initialFormState);
                  }}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Code</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Info</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No users found. Add one above!
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition">
                      <td className="p-4 font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="p-4 text-gray-600 font-mono text-sm">
                        {user.code}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : user.role === "professor"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {user.role === "student" &&
                          `${user.grade} / ${user.department}`}
                        {user.role === "professor" &&
                          `${user.department} / ${
                            user.academicDegree || ""
                          }`}
                        {user.role === "admin" && "-"}
                      </td>
                      <td className="p-4 flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
