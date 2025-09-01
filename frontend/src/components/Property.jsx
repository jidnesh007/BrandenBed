import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Filter,
  X,
  LayoutGrid,
  List,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const statusStyles = {
  Occupied: "bg-green-100 text-green-800",
  Vacant: "bg-red-100 text-red-800",
  Maintenance: "bg-yellow-100 text-yellow-800",
};

// --- Sub-Components ---

const PropertyModal = ({ property, onSave, onClose, loading }) => {
  const [formData, setFormData] = useState(
    property || {
      name: "",
      location: "",
      rent: "",
      status: "Vacant",
      tenant: "",
      notes: "",
    }
  );

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {property ? "Edit Property" : "Add New Property"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Property Name / Address"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              required
              disabled={loading}
            />
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location (e.g., Berlin, Mitte)"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              disabled={loading}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="rent"
              type="input"
              value={formData.rent}
              onChange={handleChange}
              placeholder="Rent (€)"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              required
              disabled={loading}
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              disabled={loading}
            >
              <option>Vacant</option>
              <option>Occupied</option>
              <option>Maintenance</option>
            </select>
            <input
              name="tenant"
              value={formData.tenant}
              onChange={handleChange}
              placeholder="Tenant Name"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              disabled={loading}
            />
          </div>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes..."
            className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-red-500 outline-none"
            disabled={loading}
          ></textarea>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const PropertyCard = ({ property, onEdit, onView, onDelete }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
    className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
  >
    <img
      src={
        property.photo ||
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=870&q=80"
      }
      alt={property.name}
      className="w-full h-40 object-cover"
    />
    <div className="p-4">
      <h3 className="font-bold text-lg truncate">{property.name}</h3>
      <p className="text-sm text-gray-500">{property.location}</p>
      <div className="flex justify-between items-center mt-3">
        <p className="text-xl font-bold text-gray-800">€{property.rent}/mo</p>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            statusStyles[property.status]
          }`}
        >
          {property.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Tenant: <span className="font-medium">{property.tenant || "N/A"}</span>
      </p>
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => onEdit(property)}
          className="text-gray-500 hover:text-red-600"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => onView(property)}
          className="text-gray-500 hover:text-red-600"
        >
          <Eye size={18} />
        </button>
        <button
          onClick={() => onDelete(property._id)}
          className="text-gray-500 hover:text-red-600"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  </motion.div>
);

const PropertyRow = ({ property, onEdit, onView, onDelete }) => (
  <motion.tr variants={itemVariants} className="hover:bg-red-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="font-medium text-gray-900">{property.name}</div>
      <div className="text-sm text-gray-500">{property.location}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap font-semibold">
      €{property.rent}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          statusStyles[property.status]
        }`}
      >
        {property.status}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
      {property.tenant || "N/A"}
    </td>
    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {property.lastPayment
        ? new Date(property.lastPayment).toLocaleDateString()
        : "N/A"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
      <button
        onClick={() => onEdit(property)}
        className="text-gray-500 hover:text-red-600"
      >
        <Edit size={18} />
      </button>
      <button
        onClick={() => onView(property)}
        className="text-gray-500 hover:text-red-600"
      >
        <Eye size={18} />
      </button>
      <button
        onClick={() => onDelete(property._id)}
        className="text-gray-500 hover:text-red-600"
      >
        <Trash2 size={18} />
      </button>
    </td>
  </motion.tr>
);

// --- Main Properties Page Component ---

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    minRent: "",
    maxRent: "",
  });

  const API_BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/properties`);
      const data = await response.json();
      if (data.success) {
        setProperties(data.data);
      } else {
        console.error("Failed to fetch properties:", data.message);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = useMemo(
    () =>
      properties.filter(
        (p) =>
          (filters.search === "" ||
            p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            (p.tenant &&
              p.tenant.toLowerCase().includes(filters.search.toLowerCase()))) &&
          (filters.status === "" || p.status === filters.status) &&
          (filters.minRent === "" || p.rent >= Number(filters.minRent)) &&
          (filters.maxRent === "" || p.rent <= Number(filters.maxRent))
      ),
    [properties, filters]
  );

  const analytics = useMemo(
    () => ({
      total: properties.length,
      occupied: properties.filter((p) => p.status === "Occupied").length,
      vacant: properties.filter((p) => p.status === "Vacant").length,
      avgRent:
        properties.length > 0
          ? (
              properties.reduce((acc, p) => acc + p.rent, 0) / properties.length
            ).toFixed(2)
          : 0,
    }),
    [properties]
  );

  const handleSave = async (propertyData) => {
    try {
      setSaving(true);
      const url = editingProperty
        ? `${API_BASE_URL}/properties/${editingProperty._id}`
        : `${API_BASE_URL}/properties`;
      const method = editingProperty ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyData),
      });
      const data = await response.json();
      if (data.success) {
        await fetchProperties();
        closeModal();
      } else {
        console.error("Failed to save property:", data.message);
      }
    } catch (error) {
      console.error("Error saving property:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
          await fetchProperties();
        } else {
          console.error("Failed to delete property:", data.message);
        }
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  const openModal = (property = null) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setEditingProperty(null);
    setIsModalOpen(false);
  };
  const handleView = (property) => alert(`Viewing ${property.name}`);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Properties
          </h1>
        </div>
        <motion.button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Property</span>
        </motion.button>
      </header>

      {/* Mini Analytics */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {[
          { label: "Total Properties", value: analytics.total },
          {
            label: "Occupied",
            value: analytics.occupied,
            color: "text-green-600",
          },
          { label: "Vacant", value: analytics.vacant, color: "text-red-600" },
          { label: "Average Rent", value: `€${analytics.avgRent}` },
        ].map((item) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            className="bg-white p-4 rounded-lg border shadow-sm"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className={`text-2xl font-bold ${item.color || ""}`}>
              {item.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters & View Toggle */}
      <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex-grow relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name or tenant..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="pl-10 pr-3 py-2 border rounded-md w-full sm:w-64"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-2 p-2 border rounded-md"
            >
              <Filter size={16} /> Filters
            </button>
            <div className="flex items-center gap-1 bg-gray-200 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-white text-red-600 shadow"
                    : "text-gray-600"
                }`}
              >
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-md ${
                  viewMode === "table"
                    ? "bg-white text-red-600 shadow"
                    : "text-gray-600"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {(showFilters || window.innerWidth >= 640) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  className="p-2 border rounded-md w-full sm:w-auto"
                >
                  <option value="">All Statuses</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Vacant">Vacant</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min €"
                    value={filters.minRent}
                    onChange={(e) =>
                      setFilters({ ...filters, minRent: e.target.value })
                    }
                    className="p-2 border rounded-md w-full"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max €"
                    value={filters.maxRent}
                    onChange={(e) =>
                      setFilters({ ...filters, maxRent: e.target.value })
                    }
                    className="p-2 border rounded-md w-full"
                  />
                </div>
                <button
                  onClick={() =>
                    setFilters({
                      search: "",
                      status: "",
                      minRent: "",
                      maxRent: "",
                    })
                  }
                  className="text-red-600 hover:underline"
                >
                  Clear
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isModalOpen && (
          <PropertyModal
            property={editingProperty}
            onSave={handleSave}
            onClose={closeModal}
            loading={saving}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredProperties.length > 0 ? (
            viewMode === "grid" ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProperties.map((p) => (
                  <PropertyCard
                    key={p._id}
                    property={p}
                    onEdit={openModal}
                    onView={handleView}
                    onDelete={handleDelete}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-lg border shadow-sm overflow-x-auto"
              >
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Property</th>
                      <th className="px-6 py-3">Rent</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Tenant</th>
                      <th className="hidden md:table-cell px-6 py-3">
                        Last Payment
                      </th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {filteredProperties.map((p) => (
                        <PropertyRow
                          key={p._id}
                          property={p}
                          onEdit={openModal}
                          onView={handleView}
                          onDelete={handleDelete}
                        />
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </motion.div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-xl font-semibold text-gray-700">
                No Properties Found
              </h3>
              <p className="text-gray-500 mt-2">
                Adjust your filters or add a new property to get started.
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Property;
