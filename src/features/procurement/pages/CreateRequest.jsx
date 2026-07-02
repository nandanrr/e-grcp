import { useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useNavigate } from "react-router-dom";

import * as yup from "yup";

import {
  addRequest,
} from "../procurementSlice";

import {
  addNotification,
} from "../../notification/notificationSlice";

import {
  addAuditLog,
} from "../../audit/auditSlice";
import {
  addReport,
} from "../../reports/reportSlice";

import MainLayout from "../../../components/layouts/MainLayout";

import {
  Paper,
  Box,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";

import "../../../styles/dashboardCommon.css";

/* ---------------- Validation ---------------- */

const schema = yup.object({

  request: yup
    .string()
    .trim()
    .required("Request Name is required")
    .min(5, "Request Name must be at least 5 characters")
    .max(100, "Request Name must be at most 100 characters"),

  department: yup
    .string()
    .required("Department is required"),

  priority: yup
    .string()
    .required("Priority is required"),

  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be at most 500 characters"),

});

export default function CreateRequest() {

  const dispatch = useDispatch();

  const requests = useSelector(
    (state) => state.procurement?.data ?? []
  );

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [snackbarMessage, setSnackbarMessage] =
    useState("Procurement request submitted successfully.");

  const [snackbarSeverity, setSnackbarSeverity] =
    useState("success");

  const [formData, setFormData] = useState({
    request: "",
    department: "",
    priority: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const descriptionCount = formData.description?.length || 0;

  const handleFieldChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.request?.trim()) {
      nextErrors.request = "Request Name is required";
    } else if (formData.request.trim().length < 5) {
      nextErrors.request = "Request Name must be at least 5 characters";
    } else if (formData.request.trim().length > 100) {
      nextErrors.request = "Request Name must be at most 100 characters";
    }

    if (!formData.department) {
      nextErrors.department = "Department is required";
    }

    if (!formData.priority) {
      nextErrors.priority = "Priority is required";
    }

    if (!formData.description?.trim()) {
      nextErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      nextErrors.description = "Description must be at least 20 characters";
    } else if (formData.description.trim().length > 500) {
      nextErrors.description = "Description must be at most 500 characters";
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFormSubmit = async (event) => {
    event?.preventDefault?.();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {

    const nextId =
      requests.length > 0
        ? Math.max(
            ...requests.map(
              (item) => item.id
            )
          ) + 1
        : 1;

    const currentDate =
      new Date()
        .toISOString()
        .split("T")[0];

    const newRequest = {

      id: nextId,

      request: formData.request,

      department: formData.department,

      priority: formData.priority,

      description: formData.description,

      status: "Pending",

      submittedBy:
        currentUser?.name || "Employee",

      createdBy:
        currentUser?.name || "Employee",

      submittedByEmail:
        currentUser?.email || "employee@example.com",

      createdByEmail:
        currentUser?.email || "employee@example.com",

      submittedDate: currentDate,

      createdDate: currentDate,

      attachments: [],

      comments: [],

      approvalHistory: [

        {
          stage: "Request Submitted",
          status: "Completed",
          date: currentDate,
        },

        {
          stage: "Manager Approval",
          status: "Pending",
          date: null,
        },

        {
          stage: "Procurement Approval",
          status: "Pending",
          date: null,
        },

      ],

      auditLogs: [

        {
          action: "Request Created",
          performedBy:
            currentUser?.name || "Employee",
          date: currentDate,
        },

      ],

    };

    dispatch(
      addRequest(newRequest)
    );

    dispatch(
      addNotification({

        id: crypto.randomUUID(),

        message: `${formData.request} has been submitted for approval.`,

        priority:
          newRequest.priority,

        status: "Unread",

        recipientEmail:
          currentUser?.email || "employee@example.com",

        recipientRole:
          currentUser?.role || "Employee",

        time: new Date().toLocaleTimeString([], {

          hour: "2-digit",

          minute: "2-digit",

        }),

      })
    );

    dispatch(

      addAuditLog({

        id: crypto.randomUUID(),

        activity: `${formData.request} Created`,

        user:
          currentUser?.name || "Employee",

        module: "Procurement",

        date: new Date()
          .toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          )
          .replace(/ /g, "-"),

        status: "Completed",

      })

    );      
    dispatch(
  addReport({

    id: crypto.randomUUID(),

    report: `${formData.request} Report`,

    department: formData.department,

    generatedOn: new Date().toLocaleDateString("en-GB"),

    status: "Generated",

  })
);
      setFormData({
        request: "",
        department: "",
        priority: "",
        description: "",
      });

      setSnackbarMessage("Procurement request submitted successfully.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/procurement");
      }, 1000);
    } catch {
      setSnackbarMessage("Something went wrong. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };
    return (

    <MainLayout>

      <Typography
        variant="h4"
        gutterBottom
      >
        Create Procurement Request
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          mt: 3,
        }}
      >

        <form
          onSubmit={handleFormSubmit}
        >

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >

            <TextField
              label="Request Name"
              placeholder="Example: Dell Latitude 5450 Laptops for Development Team"
              sx={{ mb: 2 }}
              fullWidth
              autoComplete="off"
              required
              slotProps={{ input: { maxLength: 100 } }}
              value={formData.request}
              onChange={handleFieldChange("request")}
              error={Boolean(formErrors.request)}
              helperText={formErrors.request}
            />

            <TextField
              select
              label="Department"
              placeholder="Select a department"
              sx={{ mb: 2 }}
              fullWidth
              required
              value={formData.department}
              onChange={handleFieldChange("department")}
              error={Boolean(formErrors.department)}
              helperText={formErrors.department}
            >
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Operations">Operations</MenuItem>
              <MenuItem value="Procurement">Procurement</MenuItem>
              <MenuItem value="Administration">Administration</MenuItem>
            </TextField>

            <TextField
              select
              sx={{ mb: 2 }}
              label="Priority"
              placeholder="Select a priority"
              fullWidth
              required
              value={formData.priority}
              onChange={handleFieldChange("priority")}
              error={Boolean(formErrors.priority)}
              helperText={formErrors.priority}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </TextField>

            <TextField
              label="Description"
              placeholder="Describe why this procurement request is needed, expected business impact, and any additional information."
              sx={{ mb: 1 }}
              multiline
              rows={5}
              fullWidth
              required
              autoComplete="off"
              slotProps={{ input: { maxLength: 500 } }}
              value={formData.description}
              onChange={handleFieldChange("description")}
              error={Boolean(formErrors.description)}
              helperText={formErrors.description || `${descriptionCount} / 500`}
            />

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 2,
                mt: 2,
              }}
            >

              <Button
                variant="outlined"
                onClick={() =>
                  navigate("/procurement")
                }
                sx={{
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: 2,
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="contained"
                disabled={isSubmitting}
                onClick={handleFormSubmit}
                sx={{
                  minWidth: 170,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: 2,
                  },
                }}
              >
                {isSubmitting ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={18} color="inherit" />
                    <span>Submitting...</span>
                  </Box>
                ) : (
                  "Submit Request"
                )}
              </Button>

            </Box>

          </Box>

        </form>

      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() =>
          setOpenSnackbar(false)
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >

        <Alert
          onClose={() =>
            setOpenSnackbar(false)
          }
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            width: "100%",
          }}
        >
          {snackbarMessage}
        </Alert>

      </Snackbar>

    </MainLayout>

  );

}