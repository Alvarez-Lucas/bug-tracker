import { firestore, auth, serverTimeStamp } from "../lib/firebase";
import { useContext, useState } from "react";
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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { ErrorSharp, Grid3x3Sharp } from "@mui/icons-material";
import { AccountCircle, AccountCircleOutline } from "mdi-material-ui";
import { typography } from "@mui/system";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { refEqual } from "firebase/firestore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ElectAssignee from "./ElectAssignee";
import ElectReporter from "./ElectReporter";
import { useForm } from "react-hook-form";

import FormControl from "@mui/material/FormControl";

export default function EditTicket({ ticketData }) {
  // use router for post information
  const router = useRouter();
  const ticketID = router.query.id;
  const projectID = router.query.projectID;
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      status: "",
      status: "",
      priority: "",
    },
  });

  const statusOptions = [
    { value: "Open", text: "Open" },
    { value: "Closed", text: "Closed" },
    { value: "Resolved", text: "Resolved" },
  ];
  const priorityOptions = ["High", "Medium", "Low"];

  // Create generic firebase reference
  const ticketRef = firestore
    .collection("projects")
    .doc(projectID)
    .collection("tickets")
    .doc(ticketID);

  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [description, setDescription] = useState("");
  const [reporter, setReporter] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");

  const allStates = {
    priority: priority,
    assignee: assignee,
    description: description,
    reporter: reporter,
    status: status,
    title: title,
  };

  // post title state to firebase on click for save button
  const submitTicket = async (e) => {
    console.log("data", data);
    e.preventDefault();

    const ref = firestore
      .collection("projects")
      .doc(projectID)
      .collection("tickets")
      .doc();

    handleClose();

    // await ref.set(data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changePriority = (event) => {
    setPriority(event.target.value);
  };

  const changeStatus = (event) => {
    setStatus(event.target.value);
  };

  // Submits

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New Ticket
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Ticket</DialogTitle>
        <form>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="Title"
              fullWidth
              variant="standard"
              helperText={errors.title?.message}
              error={errors.title ? true : false}
              {...register("title", { required: "Title is required." })}
            />
            <TextField
              multiline
              margin="dense"
              id="name"
              label="Description"
              fullWidth
              variant="standard"
              helperText={errors.description?.message}
              error={errors.description ? true : false}
              {...register("description", {
                required: "Description is required.",
              })}
            />

            <Stack>
              <ElectReporter setReporter={setReporter} />
              <ElectAssignee setAssignee={setAssignee} />

              <InputLabel id="StatusLabel">Status</InputLabel>
              <Select
                labelId="StatusLabel"
                id="editStatus"
                label="Status"
                {...register("status", {
                  required: "Status is required.",
                })}
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
              </Select>
              <InputLabel id="PriorityLabel">Priority</InputLabel>
              <Select
                labelId="PriorityLabel"
                id="editPriority"
                label="Priority"
                {...register("priority", {
                  required: "Priority is required.",
                })}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleSubmit((data) => {
                console.log("data", data);
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
