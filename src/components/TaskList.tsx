import { useSelector, useDispatch } from "react-redux";
import { Box, List, ListItem } from "@mui/material";
import React, { useEffect } from "react";

import { RootState } from "../store/store";
import TaskItem from "./TaskItem";
import { Task, updateOverdueTasks } from "../slices/taskSlice";

interface TaskListProps {
  onEdit?: (task: Task) => void;
  onCancel?: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEdit, onCancel }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateOverdueTasks());
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Box sx={{ width: "350px", maxHeight: "200px", overflowY: "auto", mt: 2 }}>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <TaskItem task={task} onEdit={onEdit} onCancel={onCancel} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
