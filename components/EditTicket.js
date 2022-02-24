import { firestore, auth, serverTimeStamp } from "../lib/firebase";
import { useContext, useState, useEffect } from "react";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { withRouter, NextRouter, useRouter } from "next/router";
import { UserContext } from "../lib/context";
import {
  Typography,
  Button,
  Grid,
  Chip,
  Stack,
  Container,
  TextField,
  ButtonGroup,
  Divider,
  Input,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { Grid3x3Sharp } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { AccountCircle, AccountCircleOutline } from "mdi-material-ui";
import { typography } from "@mui/system";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { refEqual, serverTimestamp } from "firebase/firestore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ElectAssignee from "./ElectAssignee";
import ElectReporter from "./ElectReporter";
import { useForm, Controller } from "react-hook-form";

import FormControl from "@mui/material/FormControl";

export default function EditTicket({ ticketData, setTicketData }) {
  // use router for post information
  const router = useRouter();
  const ticketID = router.query.id;
  const projectID = router.query.projectID;

  // Create generic firebase reference

  const [open, setOpen] = useState(false);
  const [assignee, setAssignee] = useState("");
  const [reporter, setReporter] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: {},
  });

  const statusOptions = [
    { label: "Open", value: "Open" },
    { label: "Closed", value: "Closed" },
    { label: "Resolved", value: "Resolved" },
  ];
  const priorityOptions = [
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

  const ticketRef = firestore
    .collection("projects")
    .doc(projectID)
    .collection("tickets")
    .doc(ticketID);

  // post title state to firebase on click for save button
  const submitTicket = async (e) => {
    // e.preventDefault();
    const data = e;
    data.creationDate = serverTimeStamp();
    data.lastUpdated = serverTimestamp();
    const ref = firestore
      .collection("projects")
      .doc(projectID)
      .collection("tickets")
      .doc(ticketID);
    handleClose();
    setTicketData(data);
    await ref.update(data);
    setSnackOpen(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setValue("assignee", assignee);
    setValue("reporter", reporter);
  }, [assignee, reporter]);

  // Submits

  return (
    <>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          Ticket has been updated.
        </Alert>
      </Snackbar>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog fullWidth maxWidth="xl" open={open} onClose={handleClose}>
        <DialogTitle>Create New Ticket</DialogTitle>
        <form>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="Title"
              variant="standard"
              fullWidth
              defaultValue={ticketData.title}
              helperText={errors.title?.message}
              error={errors.title ? true : false}
              {...register("title", { required: "Title is required." })}
            />
            <TextField
              multiline
              margin="dense"
              id="name"
              label="Description"
              variant="standard"
              fullWidth
              defaultValue={ticketData.description}
              helperText={errors.description?.message}
              error={errors.description ? true : false}
              {...register("description", {
                required: "Description is required.",
              })}
            />
            <ElectReporter
              reporter={ticketData.reporter}
              setReporter={setReporter}
            />
            <ElectAssignee setAssignee={setAssignee} />
            <TextField
              select
              {...register("status", { required: "Status is required" })}
              onChange={(e) => setValue("status", e.target.value, true)}
              label="Status"
              defaultValue={ticketData.status}
              helperText={errors.status?.message}
              error={errors.status ? true : false}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              {...register("priority", {
                required: "Priority is required",
              })}
              onChange={(e) => setValue("priority", e.target.value, true)}
              label="Priority"
              defaultValue={ticketData.priority}
              helperText={errors.priority?.message}
              error={errors.priority ? true : false}
            >
              {priorityOptions.map((priority) => (
                <MenuItem key={priority.value} value={priority.value}>
                  {priority.label}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleSubmit((data) => {
                submitTicket(data);
              })}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
