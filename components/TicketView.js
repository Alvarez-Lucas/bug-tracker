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
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

// Individual Ticket Card
export default function TicketView({
  ticketData,
  assigneeUserData,
  reporterUserData,
}) {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {!editMode ? (
        ticketData &&
        assigneeUserData &&
        reporterUserData && (
          <Grid container>
            <Grid item xs={12} md={12}>
              <Typography variant="h3">{ticketData.title}</Typography>{" "}
            </Grid>
            <Grid
              item
              // bgcolor={"green"}
              xs={12}
              md={9}
              paddingTop={5}
              paddingRight={15}
            >
              <Typography variant="body1">{ticketData.description}</Typography>
            </Grid>

            <Grid
              item
              alignItems="center"
              justifyContent="flex-end"
              // bgcolor={"blue"}
              xs={12}
              md={3}
            >
              {/* <typography>This is a test</typography> */}
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  // bgcolor: "red",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={assigneeUserData.photoURL} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Assignee"
                    secondary={assigneeUserData.displayName}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={reporterUserData.photoURL} />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary="Reporter"
                    secondary={reporterUserData.displayName}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      {ticketData.priority == "High" ? (
                        <PriorityHighIcon />
                      ) : (
                        <LowPriorityIcon />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Priority"
                    secondary={ticketData.priority}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <QuestionMarkIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary="Status"
                    secondary={ticketData.status}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        )
      ) : (
        <div>
          <h1> edit mode </h1>

          <Button varient="contained" onClick={() => setEditMode(false)}>
            View mode
          </Button>
        </div>
      )}
    </>
  );
}
