import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TaskItem from "./TaskItem";
import { Box, List, ListItem } from "@mui/material";

const TrashList: React.FC = () => {
  const trash = useSelector((state: RootState) => state.tasks.trash);

  return (
    <Box sx={{ maxHeight: "400px", overflowY: "auto", mt: 2 }}>
      <List>
        {trash.map((task) => (
          <ListItem key={task.id} disableGutters>
            <TaskItem task={task} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TrashList;
