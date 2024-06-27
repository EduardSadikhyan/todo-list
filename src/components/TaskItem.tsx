import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Task, removeTask, toggleTaskStatus } from "../slices/taskSlice";


interface TaskProps {
  task: {
    id: string;
    title: string;
    description?: string;
    deadline?: Dayjs | string | null;

    status: "pending" | "completed" | "overdue" | "removed";
  };
  currentTask?: TaskProps;
  setCurrentTask?: React.Dispatch<React.SetStateAction<Task | null>>;
  onEdit?: (task: Task) => void;
  onCancel?: (task: Task) => void;
}

const TaskItem: React.FC<TaskProps> = ({ task, onEdit, onCancel }) => {
  const dispatch = useDispatch();

  const onEditClick = () => {
    onEdit?.(task);
  };
  const onRemoveClick = () => {
    dispatch(removeTask(task.id));
    onCancel?.(task);
  };

  const deadline = task.deadline ? dayjs(task.deadline) : null;

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          {task.status !== "removed" && (
            <Grid item>
              <Checkbox
                checked={task.status === "completed"}
                onChange={() => dispatch(toggleTaskStatus(task.id))}
                disabled={task.status === "overdue"}
              />
            </Grid>
          )}
          <Grid item xs>
            <Typography
              variant="h6"
              component="div"
              sx={{
                textDecoration:
                  task.status === "completed" ? "line-through" : "none",
              }}
            >
              {task.title}
            </Typography>
            {task.description && (
              <Typography color="text.secondary" variant="body2">
                {task.description}
              </Typography>
            )}
            {task.deadline && (
              <Typography color="text.secondary" variant="body2">
                Deadline: {deadline?.toDate().toLocaleDateString()}
              </Typography>
            )}
            <Typography color="text.secondary" variant="body2">
              Status: {task.status}
            </Typography>
          </Grid>
          {task.status !== "removed" && (
            <Grid item>
              <IconButton
                color="primary"
                disabled={task.status === "completed"}
                onClick={onEditClick}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={onRemoveClick}
                disabled={task.status === "completed"}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
