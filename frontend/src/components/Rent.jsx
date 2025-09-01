import React, { useState, useEffect, useMemo } from "react";
import { Search, CheckCircle, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CSVLink } from "react-csv";

const paymentTypes = ["UPI", "Bank Transfer", "Card", "Cash"];

const statusStyles = {
  Paid: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Failed: "bg-red-100 text-red-800",
};

// --- Helper Components ---
const StatusTag = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full font-semibold text-xs ${statusStyles[status]}`}
  >
    {status}
  </span>
);

const redBtnClasses =
  "bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200";

// --- Main Rent Component ---
const RentPage = () => {
  const [properties, setProperties] = useState([]);
  const [payments, setPayments] = useState([]);
  const [flaggedPayments, setFlaggedPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    propertyId: "",
    tenant: "",
    amount: "",
    transactionId: "",
    paymentType: "UPI",
  });
  const [filterRange, setFilterRange] = useState("This Month");
  const [search, setSearch] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const API_BASE_URL = "http://localhost:5000/api";

  // Fetch properties and payments on component mount
  useEffect(() => {
    fetchProperties();
    fetchPayments();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/properties`);
      const data = await response.json();
      if (data.success) {
        const occupiedProperties = data.data.filter(
          (p) => p.status === "Occupied"
        );
        setProperties(occupiedProperties);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/payments`);
      const data = await response.json();
      if (data.success) {
        setPayments(data.data);
        const pending = data.data.filter((p) => p.status === "Pending");
        setFlaggedPayments(pending);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
      setPayments([]);
      setFlaggedPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const availableTenants = useMemo(() => {
    if (!form.propertyId) return [];
    const selectedProperty = properties.find((p) => p._id === form.propertyId);
    return selectedProperty?.tenant ? [selectedProperty.tenant] : [];
  }, [form.propertyId, properties]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, tenant: "" }));
  }, [form.propertyId]);

  const filteredHistory = useMemo(() => {
    let data = [...payments];
    if (search.trim()) {
      const term = search.toLowerCase();
      data = data.filter(
        (p) =>
          p.propertyName?.toLowerCase().includes(term) ||
          p.tenant?.toLowerCase().includes(term)
      );
    }

    const now = new Date();
    if (filterRange === "This Week") {
      const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
      data = data.filter((p) => new Date(p.date) >= firstDay);
    } else if (filterRange === "This Month") {
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      data = data.filter((p) => new Date(p.date) >= firstDay);
    } else if (filterRange === "Last 3 Months") {
      const threeMonthsAgo = new Date(new Date().setMonth(now.getMonth() - 3));
      data = data.filter((p) => new Date(p.date) >= threeMonthsAgo);
    }
    return data.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [payments, search, filterRange]);

  const stats = useMemo(() => {
    const totalCollected = filteredHistory
      .filter((p) => p.status === "Paid")
      .reduce((sum, p) => sum + p.amount, 0);
    const pendingAmount = filteredHistory
      .filter((p) => p.status === "Pending")
      .reduce((sum, p) => sum + p.amount, 0);
    const failedTransactions = filteredHistory.filter(
      (p) => p.status === "Failed"
    ).length;
    return { totalCollected, pendingAmount, failedTransactions };
  }, [filteredHistory]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const selectedProperty = properties.find(
        (p) => p._id === form.propertyId
      );
      const paymentData = {
        ...form,
        propertyName: selectedProperty?.name || "",
        date: new Date().toISOString().slice(0, 10),
        amount: Number(form.amount),
        status: "Pending",
      };
      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });
      const data = await response.json();
      if (data.success) {
        await fetchPayments();
        setForm({
          propertyId: "",
          tenant: "",
          amount: "",
          transactionId: "",
          paymentType: "UPI",
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert("Failed to submit payment: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleReviewAction = async (id, newStatus, note) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, note }),
      });
      const data = await response.json();
      if (data.success) {
        await fetchPayments();
      } else {
        alert("Failed to update payment: " + data.message);
      }
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  const csvData = filteredHistory.map(({ _id, ...rest }) => rest);

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading rent management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <CheckCircle /> Payment Submitted for Review!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 sm:p-8 rounded-xl border shadow-sm mb-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Submit New Payment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="mb-1 block font-medium text-gray-600">
                Property
              </label>
              <select
                name="propertyId"
                value={form.propertyId}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
                disabled={saving}
              >
                <option value="">Select Property...</option>
                {properties.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block font-medium text-gray-600">
                Tenant
              </label>
              <select
                name="tenant"
                value={form.tenant}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
                disabled={!form.propertyId || saving}
              >
                <option value="">Select Tenant...</option>
                {availableTenants.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block font-medium text-gray-600">
                Amount (€)
              </label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="e.g., 950"
                required
                disabled={saving}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <label className="mb-1 block font-medium text-gray-600">
                Transaction ID
              </label>
              <input
                type="text"
                name="transactionId"
                value={form.transactionId}
                onChange={handleChange}
                placeholder="Optional"
                disabled={saving}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-2">
              <label className="mb-1 block font-medium text-gray-600">
                Payment Type
              </label>
              <div className="flex flex-wrap gap-4 mt-2">
                {paymentTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      value={type}
                      checked={form.paymentType === type}
                      onChange={handleChange}
                      disabled={saving}
                      className="form-radio text-red-600"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`mt-4 ${redBtnClasses} disabled:opacity-50`}
            disabled={saving}
          >
            {saving ? "Submitting..." : "Submit Payment"}
          </button>
        </form>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <p className="text-gray-500">Total Collected ({filterRange})</p>
          <p className="text-3xl font-bold text-green-600">
            €{stats.totalCollected.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <p className="text-gray-500">Pending Amount</p>
          <p className="text-3xl font-bold text-yellow-600">
            €{stats.pendingAmount.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <p className="text-gray-500">Failed Transactions</p>
          <p className="text-3xl font-bold text-red-600">
            {stats.failedTransactions}
          </p>
        </div>
      </div>

      <section className="bg-white p-6 rounded-xl border shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Payment History</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              {["This Week", "This Month", "Last 3 Months"].map((range) => (
                <button
                  key={range}
                  onClick={() => setFilterRange(range)}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    filterRange === range
                      ? "bg-white shadow"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="border rounded px-3 py-1.5"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {csvData.length > 0 && (
              <CSVLink
                data={csvData}
                headers={Object.keys(csvData[0] || {})}
                filename="rent-payment-history.csv"
                className={`inline-flex items-center justify-center gap-2 ${redBtnClasses}`}
              >
                <Download size={16} /> Export
              </CSVLink>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Property</th>
                <th className="px-6 py-3">Tenant</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3 hidden md:table-cell">Type</th>
                <th className="px-6 py-3 hidden lg:table-cell">
                  Transaction ID
                </th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHistory.map((p) => (
                <tr key={p._id} className="hover:bg-red-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(p.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.propertyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{p.tenant}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">
                    €{p.amount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    {p.paymentType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    {p.transactionId || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusTag status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredHistory.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No payments match your filters.
          </p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Review Payments ({flaggedPayments.length})
        </h2>
        <AnimatePresence>
          {flaggedPayments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {flaggedPayments.map((payment) => (
                <motion.div
                  key={payment._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white p-6 rounded-xl shadow-lg border border-yellow-300"
                >
                  <div className="flex justify-between mb-3">
                    <h3 className="text-lg font-bold">
                      {payment.propertyName}
                    </h3>
                    <StatusTag status={payment.status} />
                  </div>
                  <p>
                    <strong>Tenant:</strong> {payment.tenant}
                  </p>
                  <p>
                    <strong>Amount:</strong> €{payment.amount?.toLocaleString()}
                  </p>
                  <p>
                    <strong>Type:</strong> {payment.paymentType}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(payment.date).toLocaleDateString()}
                  </p>
                  <textarea
                    placeholder="Leave a note..."
                    className="w-full mt-3 p-2 border rounded resize-y"
                    onChange={(e) => (payment.note = e.target.value)}
                  />
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() =>
                        handleReviewAction(payment._id, "Paid", payment.note)
                      }
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleReviewAction(payment._id, "Failed", payment.note)
                      }
                      className={`flex-1 px-4 py-2 ${redBtnClasses}`}
                    >
                      Reject
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No payments currently need review.
            </p>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default RentPage;
