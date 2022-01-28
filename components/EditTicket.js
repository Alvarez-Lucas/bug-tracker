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
import { refEqual } from "firebase/firestore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ElectAssignee from "./ElectAssignee";

export default function EditTicket({ ticketData }) {
  // use router for post information
  const router = useRouter();
  const ticketID = router.query.id;
  const projectID = router.query.projectID;

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
  const changedStates = {};

  // post title state to firebase on click for save button
  const submitTicket = async (e) => {
    e.preventDefault();
    handleClose();
    for (const [key, value] of Object.entries(allStates)) {
      if (value !== "") {
        changedStates[key] = value;
      }
    }
    await ticketRef.update(changedStates);
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
      {ticketData ? (
        <>
          <Button variant="outlined" onClick={handleClickOpen}>
            Edit
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Ticket Details</DialogTitle>
            <DialogContent>
              {/* <DialogContentText></DialogContentText> */}
              <TextField
                margin="dense"
                id="name"
                label="Title"
                fullWidth
                variant="standard"
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                multiline
                margin="dense"
                id="name"
                label="Description"
                fullWidth
                variant="standard"
                defaultValue={ticketData.description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                margin="dense"
                id="reporter"
                label="Reporter"
                fullWidth
                variant="standard"
                defaultValue={ticketData.reporter}
                onChange={(e) => setReporter(e.target.value)}
              />
              <Stack>
                <ElectAssignee setAssignee={setAssignee} />

                <InputLabel id="StatusLabel">Status</InputLabel>
                <Select
                  labelId="StatusLabel"
                  id="editStatus"
                  defaultValue={ticketData.status}
                  label="Status"
                  onChange={changeStatus}
                >
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                </Select>
                <InputLabel id="PriorityLabel">Priority</InputLabel>
                <Select
                  labelId="PriorityLabel"
                  id="editPriority"
                  defaultValue={ticketData.priority}
                  label="Priority"
                  onChange={changePriority}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={submitTicket}>Save</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
