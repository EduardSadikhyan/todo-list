import { Container, Button, Box, Typography } from "@mui/material";
import React, { useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TrashList from "./components/TrashList";

const App: React.FC = () => {
  const [showTrash, setShowTrash] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    id: "",
    title: "",
    description: "",
    deadline: null,
  });

  const handleEdit = (task: any) => {
    setCurrentTask(task);
  };

  const handleCancelEdit = () => {
    setCurrentTask({ id: "", title: "", description: "", deadline: null });
  };

  const handleSubmit = () => {
    setCurrentTask({ id: "", title: "", description: "", deadline: null });
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="div"
        sx={{ mb: 4, mt: 2, textAlign: "center" }}
      >
        Todo List Application
      </Typography>
      <TaskForm
        initialValues={currentTask}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
      />
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowTrash(!showTrash)}
        >
          {showTrash ? "Back to Tasks" : "View Trash"}
        </Button>
      </Box>
      {showTrash ? (
        <TrashList />
      ) : (
        <TaskList onCancel={handleCancelEdit} onEdit={handleEdit} />
      )}
    </Container>
  );
};

export default App;
