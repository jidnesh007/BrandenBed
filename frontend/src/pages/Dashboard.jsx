import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard,
  Building,
  ListChecks,
  MessageSquare,
  Bell,
  Users,
  Settings,
  Home,
  Search,
  DollarSign,
  Check,
  TrendingUp,
  AlertCircle,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


import TaskManager from "../components/Task";
import Rent from "../components/Rent";
import Tenant from "../components/Tenant";
import Employee from "../components/Employee";
import Property from "../components/Property";
// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Sidebar = ({
  activePage,
  setActivePage,
  isSidebarOpen,
  setSidebarOpen,
}) => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      key: "dashboard",
    },
    { name: "Properties", icon: <Building size={20} />, key: "properties" },
    { name: "Tasks", icon: <ListChecks size={20} />, key: "tasks" },
    {
      name: "Tenant Queries",
      icon: <MessageSquare size={20} />,
      key: "tenantQueries",
    },
    {
      name: "Rent Collection",
      icon: <Bell size={20} />,
      key: "rentCollection",
    },
    { name: "Employees", icon: <Users size={20} />, key: "employees" },
    { name: "Settings", icon: <Settings size={20} />, key: "settings" },
  ];

  const handleItemClick = (key) => {
    setActivePage(key);
    // On mobile, clicking an item should close the expanded sidebar overlay
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-gray-50 border-r border-gray-200 flex flex-col z-40 transition-width duration-300 ease-in-out
        ${isSidebarOpen ? "w-64" : "w-20"}
        lg:w-64`}
      role="navigation"
    >
      <div
        className={`flex items-center gap-3 mb-10 p-6 ${
          isSidebarOpen || window.innerWidth >= 1024 ? "" : "justify-center"
        }`}
      >
        <div className="bg-gray-800 p-2 rounded-lg">
          <Home size={24} className="text-white" />
        </div>
        <a href="/">
        <h1
          className={`text-2xl font-bold text-gray-800 transition-opacity duration-300 ${
            isSidebarOpen || window.innerWidth >= 1024
              ? "opacity-100"
              : "opacity-0 hidden lg:inline"
          }`}
        >
          BrandenBed
        </h1>
        </a>
        {isSidebarOpen && (
          <button
            className="lg:hidden text-gray-600 hover:text-red-600 ml-auto"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        )}
      </div>
      <nav className="flex-1 px-4">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => handleItemClick(item.key)}
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors my-2
                ${
                  activePage === item.key
                    ? "bg-red-50 text-red-600 font-semibold"
                    : "font-medium"
                }
                ${
                  isSidebarOpen || window.innerWidth >= 1024
                    ? ""
                    : "justify-center"
                }`}
            >
              {item.icon}
              <span
                className={`transition-opacity duration-300 ${
                  isSidebarOpen || window.innerWidth >= 1024
                    ? "opacity-100"
                    : "opacity-0 hidden lg:inline"
                }`}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const Header = ({ onAddProperty, onAddPayment, onToggleSidebar }) => (
  <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="flex items-center gap-4">
      <button className="lg:hidden text-gray-700" onClick={onToggleSidebar}>
        <Menu size={24} />
      </button>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Team Dashboard
      </h1>
    </div>
    <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4">
      <div className="relative flex-grow">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onAddProperty}
          className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
        >
          Add Property
        </button>
        <button
          onClick={onAddPayment}
          className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors"
        >
          Add Payment
        </button>
      </div>
    </div>
  </header>
);

const KPICard = ({ item, loading }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between"
    whileHover={{
      y: -5,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    }}
  >
    <div className="flex items-center gap-4">
      {item.icon}
      <h3 className="text-lg font-semibold text-gray-600">{item.title}</h3>
    </div>
    <div>
      {loading ? (
        <div className="animate-pulse">
          <div className="h-10 md:h-12 bg-gray-200 rounded mt-4"></div>
          {item.subtitle && (
            <div className="h-4 bg-gray-200 rounded mt-2 w-24"></div>
          )}
        </div>
      ) : (
        <>
          <p className="text-4xl md:text-5xl font-bold text-gray-800 mt-4">
            {item.value}
          </p>
          {item.subtitle && (
            <p className="text-md text-gray-500">{item.subtitle}</p>
          )}
          {item.change && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp
                size={16}
                className={item.change > 0 ? "text-green-500" : "text-red-500"}
              />
              <span
                className={`text-sm font-medium ${
                  item.change > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.change > 0 ? "+" : ""}
                {item.change}% from last month
              </span>
            </div>
          )}
        </>
      )}
    </div>
  </motion.div>
);

const StatusTag = ({ status }) => {
  const styles = {
    Pending: "bg-red-100 text-red-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    Resolved: "bg-green-100 text-green-800",
    Paid: "bg-green-100 text-green-800",
    Failed: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-md ${
        styles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

// --- Main Dashboard Component ---
const DashboardContent = ({ setActivePage, onToggleSidebar }) => {
  const [dashboardData, setDashboardData] = useState({
    properties: [],
    payments: [],
    loading: true,
    error: null,
  });

  const API_BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setDashboardData((prev) => ({ ...prev, loading: true }));
      const [propertiesResponse, paymentsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/properties`).catch((err) => ({
          ok: false,
          error: err,
        })),
        fetch(`${API_BASE_URL}/payments`).catch((err) => ({
          ok: false,
          error: err,
        })),
      ]);
      const properties = propertiesResponse.ok
        ? (await propertiesResponse.json()).data || []
        : [];
      const payments = paymentsResponse.ok
        ? (await paymentsResponse.json()).data || []
        : [];
      setDashboardData({ properties, payments, loading: false, error: null });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setDashboardData((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load dashboard data",
      }));
    }
  };

  const kpiData = React.useMemo(() => {
    const { properties, payments } = dashboardData;
    const activeTenants = properties.filter(
      (p) => p.tenant && p.tenant.trim() !== ""
    ).length;
    const thisMonthPayments = payments.filter((p) => {
      const paymentDate = new Date(p.date);
      const now = new Date();
      return (
        paymentDate.getMonth() === now.getMonth() &&
        paymentDate.getFullYear() === now.getFullYear() &&
        p.status === "Paid"
      );
    });
    const totalCollected = thisMonthPayments.reduce(
      (sum, p) => sum + (p.amount || 0),
      0
    );
    return [
      {
        title: "Total Properties",
        value: properties.length,
        icon: <Home size={24} className="text-gray-500" />,
        change: 5,
      },
      {
        title: "Active Tenants",
        value: activeTenants,
        icon: <Users size={24} className="text-gray-500" />,
        change: -2,
      },
      {
        title: "Total Rent Collected",
        value: `€${totalCollected.toLocaleString()}`,
        subtitle: "This Month",
        icon: <DollarSign size={24} className="text-gray-500" />,
        change: 12,
      },
    ];
  }, [dashboardData]);

  const monthlyRentData = React.useMemo(() => {
    const { payments } = dashboardData;
    const monthlyData = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleDateString("en-US", { month: "short" });
      monthlyData[monthName] = 0;
    }
    payments
      .filter((p) => p.status === "Paid")
      .forEach((payment) => {
        const date = new Date(payment.date);
        const monthName = date.toLocaleDateString("en-US", { month: "short" });
        if (monthlyData.hasOwnProperty(monthName)) {
          monthlyData[monthName] += payment.amount || 0;
        }
      });
    return Object.entries(monthlyData).map(([name, value]) => ({
      name,
      value,
    }));
  }, [dashboardData.payments]);

  const issueStatusData = React.useMemo(() => {
    const { payments } = dashboardData;
    const statusCount = { Pending: 0, "In Progress": 0, Resolved: 0 };
    payments.forEach((payment) => {
      if (payment.status === "Pending") statusCount.Pending++;
      else if (payment.status === "Failed") statusCount["In Progress"]++;
      else statusCount.Resolved++;
    });
    return [
      { name: "Pending", value: statusCount.Pending, color: "#EF4444" },
      {
        name: "In Progress",
        value: statusCount["In Progress"],
        color: "#FBBF24",
      },
      { name: "Resolved", value: statusCount.Resolved, color: "#10B981" },
    ];
  }, [dashboardData.payments]);

  const recentPayments = React.useMemo(() => {
    return dashboardData.payments
      .filter((p) => p.status === "Paid")
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
      .map((p) => ({
        id: p._id,
        name: p.tenant,
        amount: `€${p.amount?.toLocaleString()}`,
        date: new Date(p.date).toLocaleDateString(),
      }));
  }, [dashboardData.payments]);

  const recentQueries = [
    { id: 1, name: "John Doe", status: "Pending" },
    { id: 5, name: "Liam Jones", status: "Resolved" },
    { id: 2, name: "Jane Smith", status: "In Progress" },
  ];

  const handleAddProperty = () => setActivePage("properties");
  const handleAddPayment = () => setActivePage("rentCollection");

  if (dashboardData.error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load dashboard data</p>
          <button
            onClick={fetchDashboardData}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <Header
        onAddProperty={handleAddProperty}
        onAddPayment={handleAddPayment}
        onToggleSidebar={onToggleSidebar}
      />

      {/* Main content grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Main Column */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {kpiData.slice(0, 2).map((item) => (
              <KPICard
                key={item.title}
                item={item}
                loading={dashboardData.loading}
              />
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Monthly Rent Collection Trend
            </h3>
            {dashboardData.loading ? (
              <div className="animate-pulse h-[300px] bg-gray-200 rounded"></div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={monthlyRentData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <YAxis
                    stroke="#A0AEC0"
                    tickFormatter={(tick) =>
                      `€${tick >= 1000 ? (tick / 1000).toFixed(0) + "k" : tick}`
                    }
                  />
                  <XAxis dataKey="name" stroke="#A0AEC0" />
                  <Tooltip
                    formatter={(value) => [
                      `€${value.toLocaleString()}`,
                      "Amount",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#EF4444"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Recent Tenant Queries
            </h3>
            <div className="space-y-4">
              {recentQueries.map((query) => (
                <div
                  key={query.id}
                  className="flex justify-between items-center p-1"
                >
                  <span className="font-medium text-gray-700">
                    {query.name}
                  </span>
                  <StatusTag status={query.status} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div variants={itemVariants}>
            <KPICard item={kpiData[2]} loading={dashboardData.loading} />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Payment Status Breakdown
            </h3>
            {dashboardData.loading ? (
              <div className="animate-pulse h-[200px] bg-gray-200 rounded"></div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={issueStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                      paddingAngle={5}
                    >
                      {issueStatusData.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
                  {issueStatusData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      ></span>
                      <span className="text-gray-600 font-medium text-sm">
                        {entry.name} ({entry.value})
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Recent Payments
            </h3>
            {dashboardData.loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-3">
                {recentPayments.length > 0 ? (
                  recentPayments.map((payment) => (
                    <li
                      key={payment.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium text-gray-700">
                          {payment.name}
                        </span>
                        <p className="text-xs text-gray-500">{payment.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-gray-800">
                          {payment.amount}
                        </span>
                        <Check size={20} className="text-green-500" />
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-center py-4 text-gray-500">
                    No payments yet
                  </li>
                )}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <DashboardContent
            setActivePage={setActivePage}
            onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          />
        );
      case "properties":
        return <Property />;
      case "tasks":
        return <TaskManager />;
      case "tenantQueries":
        return <Tenant />;
      case "rentCollection":
        return <Rent />;
      case "employees":
        return <Employee />;
      default:
        return (
          <DashboardContent
            setActivePage={setActivePage}
            onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          />
        );
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out p-4 sm:p-6 md:p-8 overflow-y-auto ${
          isSidebarOpen ? "lg:ml-64" : "ml-20"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.main
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {renderContent()}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
