import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Eye,
  UserCheck,
  Trash2,
  X,
  AlertCircle,
  CheckCircle,
  Loader,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

// --- Configuration & Mock Data ---
const statusOptions = ["Pending", "In Progress", "Resolved"];
const priorityOptions = ["High", "Medium", "Low"];
const propertiesList = [
  { id: "p1", name: "Sonnenallee 12, Apt 5" },
  { id: "p2", name: "Warschauer Str. 3, Apt 2B" },
  { id: "p3", name: "Kreuzbergring 77, Apt 11" },
];
const employeesList = [
  { id: "e1", name: "John Doe" },
  { id: "e2", name: "Jane Smith" },
];

const initialQueries = [
  {
    id: 1,
    propertyId: "p1",
    tenantName: "Michael Scott",
    title: "Heating not working in living room",
    description: "The main radiator has not been working for 3 days.",
    dateSubmitted: "2025-08-30",
    status: "Pending",
    priority: "High",
    assignedTo: null,
    timeline: [
      { actor: "System", action: "Query Submitted", date: "2025-08-30" },
    ],
  },
  {
    id: 2,
    propertyId: "p2",
    tenantName: "Pam Beesly",
    title: "Broken window latch",
    description: "The kitchen window latch is broken.",
    dateSubmitted: "2025-08-29",
    status: "In Progress",
    priority: "Medium",
    assignedTo: "e1",
    timeline: [
      { actor: "Admin", action: "Assigned to John Doe", date: "2025-08-29" },
    ],
  },
  {
    id: 3,
    propertyId: "p3",
    tenantName: "Jim Halpert",
    title: "No hot water",
    description: "No hot water since this morning.",
    dateSubmitted: "2025-08-28",
    status: "Resolved",
    priority: "High",
    assignedTo: "e2",
    timeline: [
      { actor: "System", action: "Query Submitted", date: "2025-08-28" },
      { actor: "Jane Smith", action: "Marked as Resolved", date: "2025-08-29" },
    ],
  },
];

const priorityStyles = {
  High: {
    icon: <AlertCircle className="text-red-500" />,
    text: "text-red-600",
    border: "border-red-500",
  },
  Medium: {
    icon: <AlertCircle className="text-yellow-500" />,
    text: "text-yellow-600",
    border: "border-yellow-500",
  },
  Low: {
    icon: <CheckCircle className="text-green-500" />,
    text: "text-green-600",
    border: "border-green-500",
  },
};

const statusStyles = {
  Pending: {
    icon: <Loader className="animate-spin" />,
    text: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  "In Progress": {
    icon: <Loader className="animate-spin" />,
    text: "text-blue-600",
    bg: "bg-blue-100",
  },
  Resolved: {
    icon: <CheckCircle />,
    text: "text-green-600",
    bg: "bg-green-100",
  },
};

// --- Sub-Components ---
const QueryDetailDrawer = ({ query, onSave, onClose }) => {
  const [currentQuery, setCurrentQuery] = useState(query);
  const [comment, setComment] = useState("");

  const handleSave = () => {
    onSave(currentQuery);
    onClose();
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    const newTimelineEntry = {
      actor: "Admin",
      action: `Comment: ${comment}`,
      date: new Date().toISOString().split("T")[0],
    };
    setCurrentQuery({
      ...currentQuery,
      timeline: [...currentQuery.timeline, newTimelineEntry],
    });
    setComment("");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white shadow-2xl z-50 flex flex-col"
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold">
            {currentQuery.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <X />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div>
            <h3 className="font-semibold">Tenant</h3>
            <p>{currentQuery.tenantName}</p>
          </div>
          <div>
            <h3 className="font-semibold">Property</h3>
            <p>
              {
                propertiesList.find((p) => p.id === currentQuery.propertyId)
                  ?.name
              }
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Description</h3>
            <p className="text-gray-600 whitespace-pre-wrap">
              {currentQuery.description}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Status</h3>
            <select
              value={currentQuery.status}
              onChange={(e) =>
                setCurrentQuery({ ...currentQuery, status: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="font-semibold">Assign To</h3>
            <select
              value={currentQuery.assignedTo || ""}
              onChange={(e) =>
                setCurrentQuery({ ...currentQuery, assignedTo: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            >
              <option value="">Unassigned</option>
              {employeesList.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="font-semibold">Timeline</h3>
            <div className="border rounded-lg p-3 mt-2 space-y-3 max-h-48 overflow-y-auto">
              {currentQuery.timeline.map((item, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">{item.action}</p>
                  <p className="text-xs text-gray-500">
                    {item.actor} - {item.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Add a Comment</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              className="w-full p-2 border rounded-md"
            ></textarea>
            <button
              onClick={handleAddComment}
              className="mt-2 px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold hover:bg-gray-300"
            >
              Add Comment
            </button>
          </div>
        </div>
        <div className="p-6 border-t flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </>
  );
};

// --- Main Tenant Queries Page Component ---
const TenantQueriesPage = () => {
  const [queries, setQueries] = useState(initialQueries);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    property: "",
  });
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredQueries = useMemo(
    () =>
      queries.filter(
        (q) =>
          (q.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            q.tenantName
              .toLowerCase()
              .includes(filters.search.toLowerCase())) &&
          (filters.status ? q.status === filters.status : true) &&
          (filters.priority ? q.priority === filters.priority : true) &&
          (filters.property ? q.propertyId === filters.property : true)
      ),
    [queries, filters]
  );

  const handleSaveQuery = (updatedQuery) =>
    setQueries(
      queries.map((q) => (q.id === updatedQuery.id ? updatedQuery : q))
    );
  const handleDeleteQuery = (id) => {
    if (window.confirm("Delete this query?")) {
      setQueries(queries.filter((q) => q.id !== id));
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Tenant Queries
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all incoming tenant issues and requests.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700">
          <Plus size={20} />
          <span className="hidden sm:inline">Add Query</span>
        </button>
      </header>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by keyword, tenant..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="pl-10 w-full p-2 border rounded-md"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden w-full flex items-center justify-center gap-2 p-2 border rounded-md"
          >
            <Filter size={16} /> Filters {showFilters ? <X size={16} /> : null}
          </button>
        </div>
        <AnimatePresence>
          {(showFilters || window.innerWidth >= 768) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  className="p-2 border rounded-md"
                >
                  <option value="">All Statuses</option>
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select
                  value={filters.priority}
                  onChange={(e) =>
                    setFilters({ ...filters, priority: e.target.value })
                  }
                  className="p-2 border rounded-md"
                >
                  <option value="">All Priorities</option>
                  {priorityOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <select
                  value={filters.property}
                  onChange={(e) =>
                    setFilters({ ...filters, property: e.target.value })
                  }
                  className="p-2 border rounded-md"
                >
                  <option value="">All Properties</option>
                  {propertiesList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Query List */}
      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {filteredQueries.length > 0 ? (
          filteredQueries.map((query) => (
            <motion.div
              key={query.id}
              variants={itemVariants}
              layout
              className={`bg-white rounded-lg border-l-4 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                priorityStyles[query.priority].border
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-full ${
                    statusStyles[query.status].bg
                  } ${statusStyles[query.status].text}`}
                >
                  {statusStyles[query.status].icon}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{query.title}</p>
                  <p className="text-sm text-gray-500">
                    {query.tenantName} @{" "}
                    {
                      propertiesList.find((p) => p.id === query.propertyId)
                        ?.name
                    }
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm text-gray-500">
                  Submitted: {query.dateSubmitted}
                </span>
                <div className="flex gap-1">
                  {[
                    {
                      icon: <Eye size={18} />,
                      title: "View Details",
                      onClick: () => setSelectedQuery(query),
                    },
                    {
                      icon: <CheckCircle size={18} />,
                      title: "Mark as Resolved",
                      onClick: () => {},
                    },
                    {
                      icon: <Trash2 size={18} />,
                      title: "Delete Query",
                      onClick: () => handleDeleteQuery(query.id),
                    },
                  ].map((btn) => (
                    <button
                      key={btn.title}
                      onClick={btn.onClick}
                      className="p-2 hover:bg-gray-200 rounded-full"
                      title={btn.title}
                    >
                      {btn.icon}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-16 text-gray-500">
            No queries found.
          </div>
        )}
      </motion.div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedQuery && (
          <QueryDetailDrawer
            query={selectedQuery}
            onSave={handleSaveQuery}
            onClose={() => setSelectedQuery(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TenantQueriesPage;
