import React, { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { motion } from "framer-motion";

// Helper to detect if the user is on a touch device
const isTouchDevice = () => {
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return true;
  }
  return false;
};

// Use TouchBackend for touch devices, HTML5Backend for others
const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

const ItemTypes = {
  TASK: "task",
};

const initialTasks = [
  {
    id: 1,
    title: "Inspect Apartment 5, Sonnenallee",
    status: "To Do",
    priority: "High",
    assignee: "Anna Schmidt",
  },
  {
    id: 2,
    title: "Fix heating, Warschauer Str. 3",
    status: "In Progress",
    priority: "High",
    assignee: "Markus Weber",
  },
  {
    id: 3,
    title: "Schedule plumbing maintenance",
    status: "To Do",
    priority: "Medium",
    assignee: "Anna Schmidt",
  },
  {
    id: 4,
    title: "Resolve noise complaint, Kreuzbergring 77",
    status: "Done",
    priority: "Low",
    assignee: "Eva Müller",
  },
  {
    id: 5,
    title: "Renew rental contract for Apt 8",
    status: "In Progress",
    priority: "Medium",
    assignee: "Anna Schmidt",
  },
];

const TaskCard = ({ task, index, moveCard }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: task.id, index, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const priorityStyles = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  return (
    <motion.div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing"
      layout
    >
      <div className="flex justify-between items-start">
        <p className="font-semibold text-gray-800 pr-2">{task.title}</p>
        <div
          className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${
            priorityStyles[task.priority]
          }`}
          title={`Priority: ${task.priority}`}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mt-2">Assignee: {task.assignee}</p>
      <div className="flex justify-end mt-2 space-x-2">
        <button className="text-gray-400 hover:text-blue-600">
          <Edit2 size={16} />
        </button>
        <button className="text-gray-400 hover:text-red-600">
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const TaskColumn = ({ status, tasks, moveCard }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item) => {
      if (item.status !== status) {
        moveCard(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const statusStyles = {
    "To Do": {
      bg: "bg-gray-100",
      border: "border-gray-300",
      hover: "bg-gray-200",
    },
    "In Progress": {
      bg: "bg-blue-100",
      border: "border-blue-300",
      hover: "bg-blue-200",
    },
    Done: {
      bg: "bg-green-100",
      border: "border-green-300",
      hover: "bg-green-200",
    },
  };

  const currentStyle = statusStyles[status];

  return (
    <div
      ref={drop}
      className={`rounded-xl p-4 transition-colors ${currentStyle.bg} ${
        isOver ? currentStyle.hover : ""
      }`}
    >
      <h3
        className={`font-bold text-lg mb-4 text-gray-700 border-b-2 pb-2 ${currentStyle.border}`}
      >
        {status} ({tasks.length})
      </h3>
      <div className="min-h-[100px]">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            index={index}
            task={task}
            moveCard={moveCard}
          />
        ))}
      </div>
    </div>
  );
};

const TaskManager = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const moveCard = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const columns = ["To Do", "In Progress", "Done"];

  return (
    <DndProvider backend={backendForDND} options={{ enableMouseEvents: true }}>
      <div className="animate-fade-in p-4 sm:p-6 lg:p-8">
        <header className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Task Board
            </h1>
            <p className="mt-2 text-gray-500">
              Drag and drop tasks to manage your workflow.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-sm hover:bg-red-700">
            <Plus size={20} />
            <span className="hidden sm:inline">Add New Task</span>
          </button>
        </header>

        {/* 
          Alternative for mobile: horizontal scrolling. 
          Replace the `grid` div below with this to enable horizontal scrolling on mobile.
          <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-4">
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
              moveCard={moveCard}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskManager;
