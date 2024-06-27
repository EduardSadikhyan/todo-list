import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import React from "react";
import { Task, addTask, editTask } from "../slices/taskSlice";

const TaskFormSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
  description: Yup.string().trim(),
  deadline: Yup.date().nullable(),
});

interface TaskFormProps {
  initialValues: {
    id?: string;
    title: string;
    description?: string;
    deadline?: string | null;
  };
  onSubmit: (values: Task) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const dispatch = useDispatch();

  const isValidDate = (date: Dayjs | null) => {
    return dayjs(date).isValid();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={TaskFormSchema}
      onSubmit={(values, { resetForm }) => {
        const task: Task = {
          ...values,
          id: values.id || uuidv4(),
          status: "pending",
        };
        if (values.id) {
          dispatch(editTask(task));
        } else {
          dispatch(addTask(task));
        }
        resetForm();
        onSubmit(task);
      }}
    >
      {({ handleChange, values, setFieldValue }) => (
        <Form>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              {values.id ? "Edit Task" : "Add Task"}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  value={values.title}
                  onChange={handleChange}
                  helperText={<ErrorMessage name="title" />}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    label="Select Date"
                    value={values.deadline ? dayjs(values.deadline) : null}
                    onChange={(value) => {
                      if (isValidDate(value)) {
                        setFieldValue(
                          "deadline",
                          value ? value.toISOString() : null
                        );
                      } else {
                        setFieldValue("deadline", null);
                      }
                    }}
                    disablePast
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  value={values.description}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  helperText={<ErrorMessage name="description" />}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                >
                  Submit
                </Button>
                {values.id && (
                  <Button
                    type="button"
                    variant="outlined"
                    color="secondary"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
