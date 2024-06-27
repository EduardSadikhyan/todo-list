import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Dayjs } from "dayjs";

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string | null | Dayjs;
  status: "pending" | "completed" | "overdue" | "removed";
}

interface TaskState {
  tasks: Task[];
  trash: Task[];
}

const loadState = (): TaskState => {
  try {
    const data = localStorage.getItem("tasks");
    if (data === null) {
      return { tasks: [], trash: [] };
    }
    return JSON.parse(data);
  } catch (err) {
    return { tasks: [], trash: [] };
  }
};

const saveState = (state: TaskState) => {
  try {
    const data = JSON.stringify(state);
    localStorage.setItem("tasks", data);
  } catch (err) {}
};

const initialState: TaskState = loadState();

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      saveState(state);
    },
    editTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveState(state);
      }
    },
    removeTask(state, action: PayloadAction<string>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        const [removedTask] = state.tasks.splice(index, 1);
        removedTask.status = "removed";
        state.trash.push(removedTask);
        saveState(state);
      }
    },
    toggleTaskStatus(state, action: PayloadAction<string>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        const task = state.tasks[index];
        task.status = task.status === "completed" ? "pending" : "completed";
        saveState(state);
      }
    },
    updateOverdueTasks(state) {
      const currentDate = new Date().toISOString().split("T")[0];
      state.tasks.forEach((task) => {
        if (
          task.deadline &&
          task.deadline < currentDate &&
          task.status !== "completed"
        ) {
          task.status = "overdue";
        }
      });
      saveState(state);
    },
  },
});

export const {
  addTask,
  editTask,
  removeTask,
  toggleTaskStatus,
  updateOverdueTasks,
} = taskSlice.actions;
export default taskSlice.reducer;
