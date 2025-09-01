import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Users,
  Shield,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration ---
const roles = [
  { name: "Admin", color: "bg-red-600" },
  { name: "Manager", color: "bg-blue-600" },
  { name: "Staff", color: "bg-gray-600" },
];

const permissionsList = [
  "View Properties",
  "Edit Properties",
  "Manage Tenants",
  "Approve Payments",
  "Manage Employees",
  "View Reports",
];

// --- Sub-Components ---

const EmployeeModal = ({ employee, onSave, onClose, loading }) => {
  const [formData, setFormData] = useState(
    employee || {
      name: "",
      email: "",
      role: "Staff",
      permissions: [],
      phone: "",
      department: "",
      joiningDate: new Date().toISOString().slice(0, 10),
    }
  );

  const togglePermission = (perm) => {
    const newPermissions = formData.permissions.includes(perm)
      ? formData.permissions.filter((p) => p !== perm)
      : [...formData.permissions, perm];
    setFormData({ ...formData, permissions: newPermissions });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          {employee ? "Edit Employee" : "Add New Employee"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              {roles.map((role) => (
                <option key={role.name} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <fieldset>
            <legend className="mb-2 font-semibold text-gray-700">
              Permissions
            </legend>
            <div className="flex flex-wrap gap-3">
              {permissionsList.map((perm) => (
                <button
                  key={perm}
                  type="button"
                  onClick={() => togglePermission(perm)}
                  disabled={loading}
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 ${
                    formData.permissions.includes(perm)
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {perm}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Employee"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const RoleBadge = ({ role }) => {
  const roleStyle = roles.find((r) => r.name === role);
  if (!roleStyle) return null;
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-white ${roleStyle.color}`}
    >
      {role}
    </span>
  );
};

const EmployeeCard = ({ employee, onEdit, onRemove, onPermissionToggle }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <Users size={24} className="text-red-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{employee.name}</h3>
          <p className="text-sm text-gray-500">{employee.email}</p>
        </div>
      </div>
      <RoleBadge role={employee.role} />
    </div>

    {employee.phone && (
      <p className="text-sm text-gray-600 mb-2">📞 {employee.phone}</p>
    )}

    {employee.department && (
      <p className="text-sm text-gray-600 mb-2">🏢 {employee.department}</p>
    )}

    <div className="mb-4">
      <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
      <div className="flex flex-wrap gap-2">
        {permissionsList.map((perm) => (
          <button
            key={perm}
            onClick={() => onPermissionToggle(employee._id, perm)}
            className={`text-xs px-2 py-1 rounded-full font-semibold transition-colors ${
              employee.permissions.includes(perm)
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {perm}
          </button>
        ))}
      </div>
    </div>

    <div className="flex justify-end gap-2 pt-4 border-t">
      <button
        onClick={() => onEdit(employee)}
        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Edit size={18} />
      </button>
      <button
        onClick={() => onRemove(employee._id)}
        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  </motion.div>
);

const EmployeeRow = ({ employee, onEdit, onRemove, onPermissionToggle }) => (
  <motion.tr
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="hover:bg-red-50 border-b border-gray-200"
  >
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <Users size={16} className="text-red-600" />
        </div>
        <div>
          <div className="font-medium text-gray-800">{employee.name}</div>
          <div className="text-sm text-gray-500">{employee.email}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <RoleBadge role={employee.role} />
    </td>
    <td className="px-6 py-4">
      <div className="text-sm text-gray-600">
        {employee.phone && <div>📞 {employee.phone}</div>}
        {employee.department && <div>🏢 {employee.department}</div>}
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex flex-wrap gap-1">
        {permissionsList.slice(0, 3).map((perm) => (
          <button
            key={perm}
            onClick={() => onPermissionToggle(employee._id, perm)}
            className={`text-xs px-2 py-1 rounded-full font-semibold transition-colors ${
              employee.permissions.includes(perm)
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {perm}
          </button>
        ))}
        {employee.permissions.length > 3 && (
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
            +{employee.permissions.length - 3} more
          </span>
        )}
      </div>
    </td>
    <td className="px-6 py-4 text-right space-x-2">
      <button
        onClick={() => onEdit(employee)}
        className="text-gray-500 hover:text-red-600 p-1"
      >
        <Edit size={18} />
      </button>
      <button
        onClick={() => onRemove(employee._id)}
        className="text-gray-500 hover:text-red-600 p-1"
      >
        <Trash2 size={18} />
      </button>
    </td>
  </motion.tr>
);

// --- Main Employee Page Component ---

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [viewMode, setViewMode] = useState("table"); // "table" or "cards"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api";

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/employees`);
      const data = await response.json();

      if (data.success) {
        setEmployees(data.data);
      } else {
        console.error("Failed to fetch employees:", data.message);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      // Use empty array as fallback
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = useMemo(
    () =>
      employees.filter(
        (e) =>
          (e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.email.toLowerCase().includes(search.toLowerCase())) &&
          (filterRole ? e.role === filterRole : true)
      ),
    [employees, search, filterRole]
  );

  const stats = useMemo(() => {
    const roleCount = employees.reduce((acc, emp) => {
      acc[emp.role] = (acc[emp.role] || 0) + 1;
      return acc;
    }, {});

    return {
      total: employees.length,
      byRole: roleCount,
      activeThisMonth: employees.filter((emp) => {
        const joiningDate = new Date(emp.joiningDate);
        const now = new Date();
        return (
          joiningDate.getMonth() === now.getMonth() &&
          joiningDate.getFullYear() === now.getFullYear()
        );
      }).length,
    };
  }, [employees]);

  const openModal = (employee = null) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSave = async (employeeData) => {
    try {
      setSaving(true);
      const url = editingEmployee
        ? `${API_BASE_URL}/employees/${editingEmployee._id}`
        : `${API_BASE_URL}/employees`;

      const method = editingEmployee ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchEmployees(); // Refresh the list
        closeModal();
      } else {
        alert("Failed to save employee: " + data.message);
      }
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Error saving employee. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm("Are you sure you want to remove this employee?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (data.success) {
          await fetchEmployees(); // Refresh the list
        } else {
          alert("Failed to delete employee: " + data.message);
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Error deleting employee. Please try again.");
      }
    }
  };

  const handlePermissionToggle = async (employeeId, permission) => {
    try {
      const employee = employees.find((e) => e._id === employeeId);
      if (!employee) return;

      const newPermissions = employee.permissions.includes(permission)
        ? employee.permissions.filter((p) => p !== permission)
        : [...employee.permissions, permission];

      const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...employee, permissions: newPermissions }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchEmployees(); // Refresh the list
      } else {
        alert("Failed to update permissions: " + data.message);
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
      alert("Error updating permissions. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <header className="mb-8">
        <nav className="text-sm text-gray-500 mb-1">
          Dashboard /{" "}
          <span className="font-semibold text-gray-700">Employees</span>
        </nav>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Employee Management
          </h1>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors font-semibold"
          >
            <Plus size={20} /> Add Employee
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3">
            <Users size={24} className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        {roles.map((role) => (
          <div
            key={role.name}
            className="bg-white p-6 rounded-xl border shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Shield size={24} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">{role.name}s</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.byRole[role.name] || 0}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Controls */}
      <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-600">Roles:</span>
            {roles.map((r) => (
              <span
                key={r.name}
                className={`text-white text-sm px-3 py-1 rounded-full font-semibold ${r.color}`}
              >
                {r.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search name or email..."
                className="w-full border px-4 py-2 rounded-md pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border px-4 py-2 rounded-md"
            >
              <option value="">All Roles</option>
              {roles.map((r) => (
                <option key={r.name} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>

            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  viewMode === "table" ? "bg-white shadow" : "text-gray-600"
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  viewMode === "cards" ? "bg-white shadow" : "text-gray-600"
                }`}
              >
                Cards
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <AnimatePresence mode="wait">
        {viewMode === "cards" ? (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredEmployees.map((emp) => (
                <EmployeeCard
                  key={emp._id}
                  employee={emp}
                  onEdit={openModal}
                  onRemove={handleRemove}
                  onPermissionToggle={handlePermissionToggle}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-x-auto bg-white rounded-lg border shadow-sm"
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Employee</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3">Permissions</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredEmployees.map((emp) => (
                    <EmployeeRow
                      key={emp._id}
                      employee={emp}
                      onEdit={openModal}
                      onRemove={handleRemove}
                      onPermissionToggle={handlePermissionToggle}
                    />
                  ))}
                </AnimatePresence>
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-gray-500">
                      {employees.length === 0
                        ? "No employees found. Add your first employee!"
                        : "No employees match your search criteria."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <EmployeeModal
            employee={editingEmployee}
            onSave={handleSave}
            onClose={closeModal}
            loading={saving}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployeePage;
